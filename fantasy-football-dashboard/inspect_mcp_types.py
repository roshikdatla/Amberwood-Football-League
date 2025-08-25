import mcp.types

print("Available names in mcp.types:")
print(dir(mcp.types))

# Check if there's an error-related class or enum
for name in dir(mcp.types):
    if "error" in name.lower():
        print(f"Found error-related name: {name}")
