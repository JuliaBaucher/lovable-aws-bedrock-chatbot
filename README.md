# AI CV Assistant built with Lovable and AWS Bedrock

**Serverless GenAI chatbot powered by Amazon Bedrock, deployed on GitHub Pages**

---

## Overview

This project is a **serverless AI assistant embedded in a personal CV website**.  
It allows recruiters and visitors to ask questions about Julia Baucher’s background, experience, and projects.

- **Frontend UI**: Built in **React** using **Lovable** (rapid UI generation & iteration)
- **Hosting**: GitHub Pages
- **Backend**: AWS API Gateway + Lambda
- **LLM**: Amazon Bedrock (Titan / Claude-compatible models)

The frontend remains fully static, while all AI processing happens securely in AWS.

---

## High-level Architecture

GitHub Pages (React SPA, Lovable UI)


↓ POST /chat

AWS API Gateway (HTTP API, CORS enabled)

↓

AWS Lambda (Node.js 22.x)

↓

Amazon Bedrock (LLM inference)


---

## Live API Endpoint

The frontend calls the backend using the following endpoint:

POST https://by02teld6l.execute-api.eu-central-1.amazonaws.com/prod/chat


Payload example:
```json
{
  "message": "Tell me about Julia's ML experience"
}


{
  "reply": "Julia is a Senior Product Manager specializing in ML and GenAI solutions..."
}


## Frontend

- **Framework**: React (Vite)
- **UI generation**: Lovable
- **Hosting**: GitHub Pages
- **Routing**: React Router (configured with `basename` for GitHub Pages)
- **Data fetching**: `fetch` to API Gateway `POST /chat` route
- **State management**: React Query

The frontend is a **pure Single Page Application (SPA)** with **no backend secrets or credentials**.

---

## Backend (AWS)

### Lambda Function

| Setting | Value |
|------|------|
| Runtime | Node.js 22.x |
| Region | eu-central-1 |
| Trigger | API Gateway (HTTP API) |
| Environment Variables | `BEDROCK_MODEL_ID`, `SYSTEM_MESSAGE` |

The Lambda function:
- Validates input payload
- Handles CORS and `OPTIONS` preflight requests
- Invokes Amazon Bedrock using the AWS SDK
- Returns a clean JSON response to the frontend

---

### API Gateway

- **Type**: HTTP API (not REST API)
- **Route**: `POST /chat`

**CORS configuration**:
- Allowed Origin: GitHub Pages domain
- Allowed Headers: `Content-Type`
- Allowed Methods: `POST`, `OPTIONS`

---

## Amazon Bedrock

- **Purpose**: Natural language generation
- **Invocation**: via `@aws-sdk/client-bedrock-runtime`

**Configuration**:
- Model ID defined via environment variable
- Prompt includes a system message grounding responses in CV context
- Token limit, temperature, and stop sequences configured server-side

---

## Security & Design Notes

- No AWS credentials in the frontend
- No direct Bedrock access from the browser
- CORS restricted to GitHub Pages domain
- Stateless Lambda design
- Frontend and backend fully decoupled

---

## Intended Use

- Personal CV / portfolio website
- Recruiter-facing AI assistant

**Demonstrates**:
- Serverless architecture
- GenAI integration
- Clean separation of frontend and AI backend
- Production-ready AWS patterns





