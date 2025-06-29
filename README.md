# LifeOS – Your Intelligent Life Operating System

LifeOS is an open-source, AI-powered personal digital companion inspired by Gordon Bell's pioneering *MyLifeBits* project. It seamlessly captures, integrates, analyzes, and visualizes personal data—transforming everyday experiences into meaningful insights and connections.

> "There's something deeply universal and human that leads every engineer to eventually conclude: 'I need to serialize my life as an event stream dataset.'"

LifeOS is built on that impulse: to structure the chaos, debug existence, and turn raw, messy life into something searchable, queryable, replayable—maybe even beautiful.


## 🌑 On the Uncomputable

> "LifeOS is not just a system for computing life—it's a system for testing the limits of what **cannot** be computed."

While LifeOS structures thoughts, logs events, and links ideas through semantic AI and databases, it also recognizes the existence of **uncomputable dimensions** of life.

Inspired by philosophical critiques of computation, LifeOS holds space for:

- **Analog life** — embodied sensations, moods, images, sounds
- **Rational paradox** — ideas that contradict themselves or exceed logic
- **Practical limits** — ambiguity, context collapse, missing data
- **Indeterminacy** — entropy, chaos, affect, intuition, randomness

Rather than ignoring these, LifeOS tries to **interface with them**. Through free-form journaling, emotional metadata, fuzzy AI linking, and time-based transitions, LifeOS allows *the unstructured and uncertain* to coexist alongside structured data.

**This is not just software.**  
It's a **mirror** for self-awareness, and a **canvas** for lived experience—quantized, yes, but also messy, poetic, and irreducibly human.

Let LifeOS be a memory system.  
Let it also be an experiment in meaning.  
In what can be computed—and what always escapes.

## 🌍 Project Vision

LifeOS is not just a digital repository—it's an **intelligent compass** that enhances self-awareness, encourages reflection, and helps users actively manage life's complexity.

Through **AI, semantic graph relationships, and rich contextual metadata**, LifeOS becomes a *living knowledge network* that grows with you.

## ✨ Core Features

- **Multi-Modal Life Capture**  
  Events, thoughts, actions, states, interactions, documents, chats, photos, and sensor data—all stored with rich metadata.

- **File Upload & Storage**  
  Upload eBooks, documents, images, audio, and link them to meaningful moments using S3-compatible storage (e.g., Supabase Storage, AWS S3, R2).

- **AI-Powered Insight Engine**  
  Using OpenAI + Pinecone, LifeOS generates summaries, detects patterns, and suggests associative links between moments and ideas.

- **Dynamic Knowledge Graph**  
  Events and objects (people, tools, places, ideas) are linked via typed, semantically meaningful relationships using Neo4j.

- **Custom Visualizations**  
  Navigate your timeline, emotion flows, and idea webs via D3.js, Chart.js, and intelligent graph views.

- **Rich Contextual Modeling**  
  Each event can track emotion, energy, attention, source (sensor/manual/AI), and be connected to sessions or threads.

- **Privacy & Persona Layers**  
  Define granular privacy scopes (Owner, Collaborator, Viewer) for data sharing and intelligent persona modeling.

- **Secure & Compliant**  
  End-to-end encryption (TLS 1.3, AES-256), GDPR-ready, and designed for future self-hosted sovereignty.


## 🧠 Architecture Overview

LifeOS is built as a **modular system** with a **hybrid database model**, **clean backend architecture**, and optional future support for the **Model Context Protocol (MCP)**.


### **Entity Storage**
| Data Type | Storage |
|-----------|---------|
| Structured Objects (Users, People, Documents, Tags) | **PostgreSQL (via Supabase)** |
| Flexible Event Stream (Thoughts, Metrics, Actions) | **MongoDB** |
| Typed Relationships (caused_by, inspired_by, reflects_on) | **Neo4j** |
| AI Embeddings & Semantic Search | **Pinecone** |

### 🧬 Database Schema

### 📊 Data Model Philosophy

LifeOS builds upon the vision of *MyLifeBits*, but introduces several core evolutions:

| Feature                  | **LifeOS**                                                   | **MyLifeBits**                                |
|--------------------------|--------------------------------------------------------------|------------------------------------------------|
| **Core Unit**            | `event` (lived experience, journaled, contextual)            | `resource` (file or media artifact)           |
| **Schema Flexibility**   | Dynamic payloads per event type                              | Typed relational tables                        |
| **Relationships**        | Typed, directional, with metadata (cause, reflection, etc.)  | Predefined bidirectional links                 |
| **Narrative Modeling**   | Supports attention threads, transitions, sessions            | Collection-based groupings                     |
| **Graph Backbone**       | Neo4j-backed semantic graph                                   | SQL-based link table                           |
| **Context Awareness**    | Emotion, attention, energy, location                         | Largely absent                                 |
| **AI Integration**       | Built-in inference, summarization, vector linking            | Mentioned as future extension                  |


In short, LifeOS treats your life not as a static archive but as a **semantic, narrative-rich, evolving stream of consciousness**—fueled by data and made meaningful through AI.

### 🤖 AI Processing
- Serverless pipelines using **AWS Lambda / Step Functions**
- Function calls to **OpenAI API** for summarization, classification, and link generation
- Caching of recent inferences in **Redis**
- Semantic linking and retrieval using **Pinecone + Neo4j**

---

## 🛠 Backend Architecture (MVC + MCP Ready)

LifeOS uses a clean **MVC-style backend**, extended to support:

- **Router → Controller → Service** layers for clean separation
- A **Context** module passed through all operations (user, emotion, energy, attention, source)
- Optional **Protocols** for orchestrating reusable workflows (journal reflection, file upload, event linking)

This makes it **MCP-compatible** in the future: enabling LifeOS to expose or consume standardized external data through **MCP clients and servers**.

```
backend/
  routes/
  controllers/
  services/
  protocols/   # Orchestrators for AI/DB/file workflows
  context/     # Context objects with attention, emotion, etc.
  models/
  mcp/         # Optional integration layer with external MCP
```


## 🧰 Tech Stack

### **Frontend**
- **Next.js** – Fast, scalable, SEO-friendly React framework.
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **TypeScript** – Robust, type-safe development.
- **Tailwind CSS** – Modern, responsive styling.
- **Shadcn UI** – Prebuilt UI components for rapid design.

### **Backend**
- **Supabase (PostgreSQL)** – Structured entity storage and auth.
- **MongoDB** – Flexible event and journaling data.
- **Neo4j** – Graph database for semantic relationships.
- **Redis** – Fast caching layer for insights, summaries, sessions.
- **AWS Serverless** – Scalable compute via Lambda and Step Functions.
- **OpenAI API & Pinecone (Vector DB)** – Advanced AI and semantic search.
- **MCP-Ready Interfaces** – Future support for standardizing external AI integrations.

### **Infrastructure**
- **Turborepo** – Monorepo for managing frontend, backend, infra.
- **Pulumi/Terraform** – Infrastructure-as-Code for reproducible deployment.
- **GitHub Actions** – Automated CI/CD for build, test, deploy.

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd lifeos
pnpm install
```

### 🏃‍♂️ Quick Start (Recommended for Development)

To start the web application:

```bash
cd apps/web && pnpm dev
```

Or from the root directory:

```bash
pnpm --filter @lifeos/web dev
```

Visit http://localhost:3000 to view the app.

### 🔧 Alternative: Full Monorepo Setup

If you want to run all applications in the monorepo:

```bash
# From root directory (requires Turbo configuration fix)
pnpm dev
```

**Note**: The monorepo setup may require additional configuration. For development, the Quick Start method above is recommended.

### ⚙️ Configuration

Before running, create a `.env.local` file and add the following (adapt as needed):

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lifeos

# Neo4j
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_password

# Redis
REDIS_URL=redis://localhost:6379

# OpenAI
OPENAI_API_KEY=your_openai_key

# Pinecone
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENVIRONMENT=your_project_env
```

### 📦 Monorepo Structure (Turborepo)

```
apps/
  web/         → Frontend (Next.js)
  api/         → Serverless APIs (Supabase/AWS)
  workers/     → Background jobs / ETL pipelines

packages/
  ui/          → Shared UI components
  db/          → Shared types/schemas (Zod, Prisma, Mongoose)
  utils/       → OpenAI, Pinecone, logging, etc.
```

## 🧪 Testing Strategy

LifeOS implements a comprehensive testing strategy across multiple levels:

### Unit Testing
- Jest/Vitest for component and utility testing
- React Testing Library for component testing
- MSW for API mocking
- Coverage requirements: 80%+ for critical paths

### Integration Testing
- API integration tests with supertest
- Database integration with test containers
- Event processing validation
- Graph relationship verification

### E2E Testing
- Playwright for critical user journeys
- Cypress for component/page testing
- Cross-browser compatibility
- Mobile responsiveness

### Performance Testing
- Load testing with k6
- Performance monitoring
- Memory leak detection
- Database query optimization

### Security Testing
- OWASP compliance checks
- Penetration testing
- Authentication flow validation
- Data encryption verification

### CI/CD Pipeline
- Automated testing on PR
- Deployment gates
- Environment-specific testing
- Regression test suite

```bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Run all tests with coverage
pnpm test:coverage
```

## 🔒 Privacy Notice

LifeOS takes your privacy seriously. We:
- Do not sell or share your personal information
- Provide granular control over data sharing
- Allow complete data export and deletion
- Support self-hosting for maximum privacy

## 🤝 Contributing

We enthusiastically welcome contributions! Whether you're a seasoned developer or new to open source:

- 🧩 **Features** – Implement new modules or visualizations
- 🛠 **Fixes** – Report and squash bugs
- 📚 **Docs** – Help document system design and usage patterns

## 📜 License

LifeOS is open-source software licensed under the MIT License.

---

Join us in building a meaningful digital legacy.  
Let your life become a searchable, interpretable, and beautiful flow of information.

**Welcome aboard!** 🚀
