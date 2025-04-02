import mermaid from 'mermaid';

declare module 'mermaid' {
  interface MermaidConfig {
    classDiagram?: {
      useMaxWidth?: boolean;
    };
  }
}

type DiagramType = 'class' | 'sequence' | 'activity' | 'state' | 'er' | 'component' | 'deployment';

interface RenderError extends Error {
  diagram?: string;
  code?: string;
}

export const initializeMermaid = () => {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    themeCSS: `
      .node rect, .node circle, .node ellipse, .node polygon, .node path {
        fill: #f2f6fc;
        stroke: #5c7cfa;
        stroke-width: 1px;
      }
      .edgeLabel {
        background-color: #f9fafb;
        padding: 2px 4px;
        border-radius: 4px;
      }
      .edgePath .path {
        stroke: #5c7cfa;
        stroke-width: 1.5px;
      }
      .cluster rect {
        fill: #f9fafb;
        stroke: #e4e7eb;
        stroke-width: 1px;
        rx: 5px;
        ry: 5px;
      }
      .label {
        font-family: 'Inter', sans-serif;
      }
    `,
    securityLevel: 'loose',
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
    },
    er: {
      layoutDirection: 'TB',
      entityPadding: 15,
      useMaxWidth: true,
    },
    sequence: {
      showSequenceNumbers: false,
      actorMargin: 80,
      boxMargin: 10,
      mirrorActors: false,
      bottomMarginAdj: 10,
      useMaxWidth: true,
      width: 150,
    },
    classDiagram: {
      useMaxWidth: true,
    },
  });
};

export const renderDiagram = async (id: string, content: string): Promise<void> => {
  try {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Element with id ${id} not found`);
    }
    element.innerHTML = content;
    await mermaid.run({
      nodes: [element],
    });
  } catch (error) {
    const renderError: RenderError = error as Error;
    renderError.diagram = content;
    console.error('Error rendering diagram:', renderError);
    throw renderError;
  }
};

export const getDiagramSvg = async (content: string): Promise<string> => {
  try {
    const { svg } = await mermaid.render('export-diagram', content);
    return svg;
  } catch (error) {
    console.error('Error generating SVG:', error);
    return '';
  }
};

export const getDiagramTemplate = (type: DiagramType): string => {
  switch (type) {
    case 'class':
      return `classDiagram
    class User {
        +String id
        +String username
        +String email
        -String password
        #Date lastLogin
        +login(String password)
        +logout()
        +updateProfile(Profile profile)
    }
    class Profile {
        +String userId
        +String fullName
        +String avatar
        +updateAvatar(String url)
    }
    User "1" -- "1" Profile : has
    User "1" *-- "*" Order : places`;
    
    case 'sequence':
      return `sequenceDiagram
    actor User
    participant Frontend
    participant API
    participant Database
    
    User->>Frontend: Request page
    Frontend->>API: Fetch data
    API->>Database: Query
    Database-->>API: Return results
    API-->>Frontend: Return data
    Frontend-->>User: Display page`;
    
    case 'activity':
      return `flowchart TD
    A[Start] --> B{Is user logged in?}
    B -->|Yes| C[Show Dashboard]
    B -->|No| D[Show Login]
    D --> E[User enters credentials]
    E --> F{Credentials valid?}
    F -->|Yes| C
    F -->|No| G[Show error]
    G --> D`;
    
    case 'state':
      return `stateDiagram-v2
    [*] --> Idle
    Idle --> Processing: Start Process
    Processing --> Success: Completed
    Processing --> Error: Failed
    Success --> Idle: Reset
    Error --> Idle: Reset
    Idle --> [*]: Exit`;
    
    case 'er':
      return `erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        string id
        string name
        string email
    }
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        string id
        date created_at
        string status
    }
    ORDER_ITEM {
        string order_id
        string product_id
        int quantity
    }
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    PRODUCT {
        string id
        string name
        float price
    }`;
    
    case 'component':
      return `componentDiagram
    component Frontend {
        [UI Components]
        [State Management]
    }
    component Backend {
        [API Gateway]
        [Services]
        [Database]
    }
    [UI Components] --> [State Management]
    Frontend --> Backend : HTTP/REST
    [API Gateway] --> [Services]
    [Services] --> [Database]`;
    
    case 'deployment':
      return `deploymentDiagram
    node Browser {
        component Frontend
    }
    node "Web Server" {
        component Backend
        component "Static Files"
    }
    node "Database Server" {
        component MySQL
    }
    Browser --> "Web Server" : HTTPS
    Backend --> MySQL : TCP`;
    
    default:
      throw new Error(`Unsupported diagram type: ${type}`);
  }
};

/**
 * Validates diagram syntax without rendering
 * @param content Diagram content to validate
 * @returns boolean indicating if syntax is valid
 */
export const validateDiagramSyntax = async (content: string): Promise<boolean> => {
  try {
    await mermaid.parse(content);
    return true;
  } catch {
    return false;
  }
};