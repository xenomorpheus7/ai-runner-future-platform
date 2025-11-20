import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, Copy, Play, Save, X, GripVertical, ChevronRight, FileText, Wand2, Database, Code, Image } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WorkflowNode {
  id: string;
  type: "input" | "transform" | "ai-generate" | "output";
  label: string;
  position: { x: number; y: number };
  data: {
    template?: string;
    variables?: Record<string, string>;
    prompt?: string;
    output?: string;
  };
}

interface WorkflowConnection {
  id: string;
  from: string;
  to: string;
}

interface WorkflowBuilderProps {
  onTemplateGenerate?: (template: string, variables: Record<string, string>) => void;
}

export const WorkflowBuilder = ({ onTemplateGenerate }: WorkflowBuilderProps) => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: "node-1",
      type: "input",
      label: "Text Input",
      position: { x: 50, y: 50 },
      data: { variables: { topic: "", tone: "", style: "" } },
    },
    {
      id: "node-2",
      type: "transform",
      label: "Transform",
      position: { x: 300, y: 50 },
      data: { 
        template: "Topic: {{ $json.topic }}\nTone: {{ $json.tone }}\nStyle: {{ $json.style }}", 
        variables: {} 
      },
    },
    {
      id: "node-3",
      type: "ai-generate",
      label: "AI Generate",
      position: { x: 550, y: 50 },
      data: { 
        prompt: "Write a {{ $json.tone }} article about {{ $json.topic }} in a {{ $json.style }} style. Make it engaging and informative.", 
        output: "" 
      },
    },
    {
      id: "node-4",
      type: "output",
      label: "Output",
      position: { x: 800, y: 50 },
      data: { output: "" },
    },
  ]);

  const [connections, setConnections] = useState<WorkflowConnection[]>([
    { id: "conn-1", from: "node-1", to: "node-2" },
    { id: "conn-2", from: "node-2", to: "node-3" },
    { id: "conn-3", from: "node-3", to: "node-4" },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [workflowName, setWorkflowName] = useState("AI Content Workflow");
  const [templatePreview, setTemplatePreview] = useState("");
  const [variables, setVariables] = useState<Record<string, string>>({
    topic: "",
    tone: "",
    style: "",
  });

  const selectedNodeData = nodes.find((n) => n.id === selectedNode);

  // Available placeholder functions (n8n-style)
  const placeholderFunctions = [
    { label: "Variable", value: "{{ $json.variableName }}", description: "Access variable from input" },
    { label: "Node Output", value: '{{ $node["Node Name"].json.field }}', description: "Access output from specific node" },
    { label: "Current Item", value: "{{ $item.json.field }}", description: "Access current item in loop" },
    { label: "Expression", value: "{{ $json.field1 + ' ' + $json.field2 }}", description: "Combine values with expressions" },
  ];

  // Update template preview when variables or template changes
  useEffect(() => {
    // Get input node variables for preview
    const inputNode = nodes.find((n) => n.type === "input");
    const inputVars = inputNode?.data.variables || {};
    const allVars = { ...inputVars, ...variables };
    
    if (selectedNodeData?.type === "transform" && selectedNodeData.data.template) {
      let preview = selectedNodeData.data.template;
      Object.entries(allVars).forEach(([key, value]) => {
        if (value) {
          preview = preview.replace(new RegExp(`{{\\s*\\$json\\.${key}\\s*}}`, "g"), value);
        }
      });
      setTemplatePreview(preview);
    } else if (selectedNodeData?.type === "ai-generate" && selectedNodeData.data.prompt) {
      let preview = selectedNodeData.data.prompt;
      Object.entries(allVars).forEach(([key, value]) => {
        if (value) {
          preview = preview.replace(new RegExp(`{{\\s*\\$json\\.${key}\\s*}}`, "g"), value);
        }
      });
      setTemplatePreview(preview);
    } else {
      setTemplatePreview("");
    }
  }, [selectedNodeData, variables, nodes]);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
    const node = nodes.find((n) => n.id === nodeId);
    if (node?.data.variables) {
      setVariables({ ...variables, ...node.data.variables });
    }
    // Initialize variables from input node if it's the first node
    if (node?.type === "input") {
      const inputNode = nodes.find((n) => n.type === "input");
      if (inputNode?.data.variables) {
        setVariables(inputNode.data.variables);
      }
    }
  };

  const handleAddNode = (type: WorkflowNode["type"]) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type,
      label: type === "input" ? "Text Input" : type === "transform" ? "Transform" : type === "ai-generate" ? "AI Generate" : "Output",
      position: { x: nodes.length * 250 + 50, y: 50 },
      data: { variables: {}, template: "", prompt: "", output: "" },
    };
    setNodes([...nodes, newNode]);
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes(nodes.filter((n) => n.id !== nodeId));
    setConnections(connections.filter((c) => c.from !== nodeId && c.to !== nodeId));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  };

  const handleUpdateNodeData = (nodeId: string, data: Partial<WorkflowNode["data"]>) => {
    setNodes(
      nodes.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node))
    );
  };

  const handleInsertPlaceholder = (placeholder: string) => {
    if (selectedNodeData) {
      const currentTemplate = selectedNodeData.data.template || selectedNodeData.data.prompt || "";
      const textarea = document.getElementById("template-input") as HTMLTextAreaElement;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText = currentTemplate.substring(0, start) + placeholder + currentTemplate.substring(end);
        if (selectedNodeData.type === "transform") {
          handleUpdateNodeData(selectedNodeData.id, { template: newText });
        } else if (selectedNodeData.type === "ai-generate") {
          handleUpdateNodeData(selectedNodeData.id, { prompt: newText });
        }
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + placeholder.length, start + placeholder.length);
        }, 0);
      }
    }
  };

  const handleGenerateContent = () => {
    // Get input node variables
    const inputNode = nodes.find((n) => n.type === "input");
    const inputVars = inputNode?.data.variables || {};
    
    // Get AI generate node
    const aiNode = nodes.find((n) => n.type === "ai-generate");
    if (aiNode && aiNode.data.prompt) {
      let finalPrompt = aiNode.data.prompt;
      
      // Replace all placeholders with actual values
      Object.entries(inputVars).forEach(([key, value]) => {
        if (value) {
          // Replace {{ $json.key }} with value
          finalPrompt = finalPrompt.replace(new RegExp(`{{\\s*\\$json\\.${key}\\s*}}`, "g"), value);
        }
      });
      
      // Also replace any remaining variables from the variables state
      Object.entries(variables).forEach(([key, value]) => {
        if (value) {
          finalPrompt = finalPrompt.replace(new RegExp(`{{\\s*\\$json\\.${key}\\s*}}`, "g"), value);
        }
      });
      
      if (onTemplateGenerate) {
        onTemplateGenerate(finalPrompt, { ...inputVars, ...variables });
      }
    } else {
      // If no AI node or prompt, show error or use transform node output
      const transformNode = nodes.find((n) => n.type === "transform");
      if (transformNode && transformNode.data.template) {
        let finalTemplate = transformNode.data.template;
        Object.entries(inputVars).forEach(([key, value]) => {
          if (value) {
            finalTemplate = finalTemplate.replace(new RegExp(`{{\\s*\\$json\\.${key}\\s*}}`, "g"), value);
          }
        });
        if (onTemplateGenerate) {
          onTemplateGenerate(finalTemplate, inputVars);
        }
      }
    }
  };

  const getNodeIcon = (type: WorkflowNode["type"]) => {
    switch (type) {
      case "input":
        return <FileText className="h-4 w-4" />;
      case "transform":
        return <Code className="h-4 w-4" />;
      case "ai-generate":
        return <Wand2 className="h-4 w-4" />;
      case "output":
        return <Database className="h-4 w-4" />;
    }
  };

  const getNodeColor = (type: WorkflowNode["type"]) => {
    switch (type) {
      case "input":
        return "border-primary/50 bg-primary/10";
      case "transform":
        return "border-secondary/50 bg-secondary/10";
      case "ai-generate":
        return "border-accent/50 bg-accent/10";
      case "output":
        return "border-primary/50 bg-primary/10";
    }
  };

  return (
    <TooltipProvider>
    <div className="workflow-builder w-full space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 glass-card rounded-lg border-primary/20">
        <div className="flex items-center gap-4">
          <Input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="bg-background/50 border-primary/30 max-w-xs text-foreground placeholder:text-muted-foreground/50"
            placeholder="Workflow Name"
          />
          <Button
            size="sm"
            onClick={handleGenerateContent}
            className="bg-primary/10 hover:bg-primary hover:text-primary-foreground border border-primary/30"
          >
            <Play className="h-4 w-4 mr-2" />
            Run Workflow
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-primary/30 hover:bg-primary/10"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select onValueChange={(value) => handleAddNode(value as WorkflowNode["type"])}>
            <SelectTrigger className="w-[180px] bg-background/50 border-primary/30">
              <SelectValue placeholder="Add Node" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="input">Text Input</SelectItem>
              <SelectItem value="transform">Transform</SelectItem>
              <SelectItem value="ai-generate">AI Generate</SelectItem>
              <SelectItem value="output">Output</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Workflow Canvas */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 rounded-2xl border-primary/20 min-h-[500px] relative overflow-auto">
            <div className="workflow-canvas relative" style={{ minHeight: "400px", width: "100%" }}>
              {/* Nodes */}
              {nodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  className={`absolute cursor-pointer transition-all ${
                    selectedNode === node.id
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : ""
                  } ${getNodeColor(node.type)} border-2 rounded-lg p-4 min-w-[150px]`}
                  style={{
                    left: `${node.position.x}px`,
                    top: `${node.position.y}px`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getNodeIcon(node.type)}
                      <span className="font-medium text-sm text-foreground">{node.label}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:bg-destructive/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNode(node.id);
                      }}
                    >
                      <X className="h-3 w-3 text-foreground" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {node.type === "input" && "Enter text input"}
                    {node.type === "transform" && "Transform with template"}
                    {node.type === "ai-generate" && "Generate AI content"}
                    {node.type === "output" && "View output"}
                  </div>
                </div>
              ))}

              {/* Connections */}
              <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
                {connections.map((conn) => {
                  const fromNode = nodes.find((n) => n.id === conn.from);
                  const toNode = nodes.find((n) => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  const x1 = fromNode.position.x + 150;
                  const y1 = fromNode.position.y + 50;
                  const x2 = toNode.position.x;
                  const y2 = toNode.position.y + 50;

                  return (
                    <g key={conn.id}>
                      <path
                        d={`M ${x1} ${y1} L ${x2} ${y2}`}
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                        className="opacity-50"
                      />
                    </g>
                  );
                })}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--primary))" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Node Configuration Panel */}
        <div className="space-y-4">
          {selectedNodeData ? (
            <div className="glass-card p-6 rounded-2xl border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-foreground">Node Configuration</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedNode(null)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4 text-foreground" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Input Node */}
                {selectedNodeData.type === "input" && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground">Input Variables</Label>
                      <p className="text-xs text-muted-foreground mb-3">
                        Define variables that will be used in your workflow templates
                      </p>
                      {Object.entries(selectedNodeData.data.variables || {}).map(([key, value]) => (
                        <div key={key} className="mt-2">
                          <Label className="text-xs text-foreground mb-1 block">{key}</Label>
                          <Input
                            placeholder={`Enter ${key}...`}
                            value={value as string}
                            onChange={(e) => {
                              const newVars = { ...(selectedNodeData.data.variables || {}), [key]: e.target.value };
                              handleUpdateNodeData(selectedNodeData.id, { variables: newVars });
                              // Update local variables state
                              setVariables(newVars);
                            }}
                            className="bg-background/50 border-primary/30"
                          />
                        </div>
                      ))}
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 w-full border-primary/30 hover:bg-primary/10"
                        onClick={() => {
                          const currentVars = selectedNodeData.data.variables || {};
                          const newKey = `variable${Object.keys(currentVars).length + 1}`;
                          const newVars = { ...currentVars, [newKey]: "" };
                          handleUpdateNodeData(selectedNodeData.id, { variables: newVars });
                          setVariables(newVars);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Variable
                      </Button>
                    </div>
                  </div>
                )}

                {/* Transform Node */}
                {selectedNodeData.type === "transform" && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground">Template</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Create a template using n8n-style placeholders
                      </p>
                      <Textarea
                        id="template-input"
                        value={selectedNodeData.data.template || ""}
                        onChange={(e) =>
                          handleUpdateNodeData(selectedNodeData.id, { template: e.target.value })
                        }
                        placeholder="Enter template with placeholders like {{ $json.variableName }}"
                        className="min-h-[150px] bg-background/50 border-primary/30 font-mono text-sm text-foreground placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-foreground">Available Placeholders</Label>
                      <div className="space-y-2 mt-2">
                        {placeholderFunctions.map((func, idx) => (
                          <Tooltip key={idx}>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full justify-start text-xs border-primary/30 hover:bg-primary/10"
                                onClick={() => handleInsertPlaceholder(func.value)}
                              >
                                <code className="text-xs text-foreground">{func.value}</code>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{func.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                    {templatePreview && (
                      <div>
                        <Label>Live Preview</Label>
                        <div className="p-3 bg-background/80 border border-primary/20 rounded-md text-sm font-mono whitespace-pre-wrap">
                          {templatePreview}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* AI Generate Node */}
                {selectedNodeData.type === "ai-generate" && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground">AI Prompt Template</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Create an AI prompt using placeholders that will be replaced with input variables
                      </p>
                      <Textarea
                        id="template-input"
                        value={selectedNodeData.data.prompt || ""}
                        onChange={(e) =>
                          handleUpdateNodeData(selectedNodeData.id, { prompt: e.target.value })
                        }
                        placeholder="Write a blog post about {{ $json.topic }} in a {{ $json.tone }} tone..."
                        className="min-h-[150px] bg-background/50 border-primary/30 font-mono text-sm text-foreground placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-foreground">Available Placeholders</Label>
                      <div className="space-y-2 mt-2">
                        {placeholderFunctions.map((func, idx) => (
                          <Tooltip key={idx}>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full justify-start text-xs border-primary/30 hover:bg-primary/10"
                                onClick={() => handleInsertPlaceholder(func.value)}
                              >
                                <code className="text-xs text-foreground">{func.value}</code>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{func.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                    {templatePreview && (
                      <div>
                        <Label>Live Preview</Label>
                        <div className="p-3 bg-background/80 border border-primary/20 rounded-md text-sm font-mono whitespace-pre-wrap">
                          {templatePreview}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Output Node */}
                {selectedNodeData.type === "output" && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground">Output</Label>
                      <div className="p-3 bg-background/80 border border-primary/20 rounded-md text-sm min-h-[100px] text-foreground">
                        {selectedNodeData.data.output || "Output will appear here after workflow execution"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="glass-card p-6 rounded-2xl border-primary/20">
              <p className="text-muted-foreground text-sm text-center">
                Select a node to configure it
              </p>
            </div>
          )}

          {/* Template Examples */}
          <div className="glass-card p-4 rounded-2xl border-primary/20">
            <h4 className="font-bold text-sm mb-2 text-foreground">Template Examples</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-background/80 border border-primary/20 rounded">
                <code className="text-xs text-foreground">Write about {`{{ $json.topic }}`}</code>
              </div>
              <div className="p-2 bg-background/80 border border-primary/20 rounded">
                <code className="text-xs text-foreground">Create a {`{{ $json.tone }}`} story about {`{{ $json.subject }}`}</code>
              </div>
              <div className="p-2 bg-background/80 border border-primary/20 rounded">
                <code className="text-xs text-foreground">Generate an image: {`{{ $json.description }}`} in {`{{ $json.style }}`} style</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
};
