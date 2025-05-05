import React from 'react';
import ReactMarkdown from 'react-markdown';

const mcpContent = `
# What Are MCP Servers — And Why Every Dev Should Care

Imagine telling your AI coding assistant, "Hey, fix this bug, commit the code, and open a pull request." And it actually does it.

That's not science fiction — it's the future of development, and it's powered by something called MCP servers.

In this post, we'll break down what MCP (Model-Connected Process) servers are, how they supercharge tools like Cursor, GitHub Copilot, and VS Code Agent Mode, and why you should start using them today.

🚀 **What's an MCP Server?**

MCP stands for Model-Connected Process. It's a protocol — a standard way for AI tools to talk to real-world dev tools like GitHub, Figma, your terminal, and even CI/CD systems.

In simple terms: it's the bridge between your AI assistant and your workflow.

Instead of just suggesting code, the AI can now:

- Read and edit your files
- Run tests in your terminal
- Push changes to GitHub
- Query design files from Figma
- Pull up project docs from Notion

It's like giving your AI agent a keyboard and mouse — and telling it what it's allowed to click.

🛠️ **How It Works (Without the Buzzwords)**

Here's the basic flow:

1. You ask your assistant: "Run my tests."
2. The AI realizes it needs to act.
3. It sends a request to an MCP server — like a terminal server.
4. That server runs npm test on your machine.
5. The results are sent back to the AI, which then decides what to do next.

These servers can be local (running on your machine) or remote (hosted in the cloud), and each one is tightly scoped. The AI doesn't have full control — only what you allow.

🔧 **Examples of MCP Servers in Action**

Here are some real things developers are doing with MCP servers:

### 1. From Figma to Code

> "Turn this design into a React component."
>
> - The Figma MCP pulls the layout.
> - The AI generates JSX + CSS.
> - The File System MCP saves it.
> - The GitHub MCP commits it.

### 2. Debugging Test Failures

> "Why did my build fail?"
>
> - The CI/CD MCP grabs logs.
> - The AI highlights what broke.
> - Suggests a fix. Applies it. Reruns tests.

### 3. Handling Project Tasks

> "Mark Jira ticket #101 as done."
>
> - The Jira MCP closes the task.
> - The Notion MCP updates docs.

### 4. File and Terminal Commands

> "Search all files for TODOs and create a summary."
>
> - Filesystem MCP searches files.
> - Terminal MCP runs commands.

⚙️ **How You Can Use It**

**Step 1: Install an MCP server**

You can use:

~~~
npx -y @modelcontextprotocol/server-github
pip install terminal-controller
~~~

Or pull one via Docker.

**Step 2: Configure your IDE**

In Cursor or VS Code, add this in .mcp.json:

~~~json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..." }
    }
  }
}
~~~

**Step 3: Try it out**

Then ask your agent:

- "@github get_my_repos"
- "@terminal run npm test"
- "@filesystem read README.md"

You'll get real results, and real actions.

🔮 **Where This Is Going**

MCP is catching fire. Major dev platforms (GitHub, Notion, CircleCI, Linear, Jira) are already building official servers.

The AI assistant of the future won't just write your code — it'll:

- Build containers
- Run tests
- Deploy to staging
- File Jira tickets
- Write the changelog

And it'll do all of that because of MCP.

✅ **TL;DR**

- MCP servers let AI tools act, not just suggest.
- You can connect your editor to tools like GitHub, Terminal, Figma, Notion.
- It's the next step toward fully AI-powered development.
- If you use Cursor or Copilot, and you want to automate more of your dev tasks, MCP is the upgrade you didn't know you needed.

🔗 **Links to Explore:**

- [MCP Servers on GitHub](https://github.com/modelcontextprotocol/servers)
- [Model Context Protocol GitHub Organization](https://github.com/modelcontextprotocol)
- [MCP Specification (Official)](https://spec.modelcontextprotocol.io/specification/)
`;

const MCPPage = () => {
  return (
    <div className='min-h-screen bg-white py-16 px-4 sm:px-8 lg:px-32'>
      <h1 className='text-4xl font-bold text-blue-700 mb-8 text-center'>
        MCP: The Future of Dev Automation
      </h1>
      <article className='prose prose-blue prose-lg bg-gray-50 rounded-xl shadow-md p-8 w-full'>
        <ReactMarkdown>{mcpContent}</ReactMarkdown>
      </article>
    </div>
  );
};

export default MCPPage;
