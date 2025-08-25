import inspect
import mcp
import mcp.server
import mcp.server.stdio

try:
    print("MCP version:", mcp.__version__)
except AttributeError:
    print("MCP version: Not available")
print("\nMCP module structure:")
print(dir(mcp))
print("\nMCP server module structure:")
print(dir(mcp.server))
print("\nMCP server stdio module structure:")
print(dir(mcp.server.stdio))

# Try to find the stdio server transport class
for name in dir(mcp.server.stdio):
    obj = getattr(mcp.server.stdio, name)
    if inspect.isclass(obj) and "transport" in name.lower():
        print(f"\nFound potential transport class: {name}")
        print(inspect.getmro(obj))
