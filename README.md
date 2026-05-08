# AI Email Generator

## Project Overview

The AI Email Generator is a simple AI-powered content generation tool designed to help users create complete emails quickly and efficiently. The application allows users to select the type of email, provide the purpose of the email, and enter key details. The system then generates a structured email response automatically.

This project was developed as part of the CAPACITI AI Bootcamp Week 2 project on AI Content Generation and Productivity.

---

## Features

* Generate professional and structured emails
* Choose between formal and informal email styles
* Input custom purpose and key details
* Automatically generates:

  * Subject line
  * Greeting
  * Email body
  * Closing statement
* Beginner-friendly and easy-to-use interface

---

## How the Generator Works

1. The user selects the email type:

   * Formal
   * Informal

2. The user enters:

   * The purpose of the email
   * Key details or information to include

3. The AI processes the input and generates a complete email response.

---

## Technologies Used

* Lovable

---

## Prompt Library

### Prompt Version 1

```text
Write a professional email for the user.
```

### Prompt Version 2

```text
You are a professional email writer.

The user wants a formal or informal email based on their selected option.

Generate a complete email using the user's purpose and key details.
```

### Prompt Version 3

```text
You are a professional email assistant.

The user selects an email type (formal or informal), enters the purpose of the email, and provides key details.

Generate a complete email that includes:
- Subject line
- Greeting
- Structured body
- Professional closing

Keep the tone clear, appropriate, and well-structured.
```

---

## Prompt Engineering Case Study

### Problem

The initial prompts generated inconsistent email responses and sometimes lacked proper structure.

### Improvement

The prompts were refined by adding:

* Clear role instructions
* Context about the email type
* Structured output requirements
* Tone guidance

### Result

The generated emails became more professional, consistent, and better structured for different use cases.

---

## Example Input

### User Input

* Email Type: Formal
* Purpose: Request for leave
* Key Details: Family emergency, requesting 3 days leave

---

## Example Output

Subject: Leave Request

Dear Manager,

I hope you are doing well. I am writing to formally request three days of leave due to a family emergency.

I would appreciate your understanding and approval during this time.

Kind regards,
[Name]

---


## Author

Sangiwe Nkwanyana

CAPACITI AI Bootcamp Candidate
