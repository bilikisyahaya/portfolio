import React from "react";
import Markdoc, { type Node } from "@markdoc/markdoc";
import { renderable } from "@/lib/content";

export function MarkdocContent({ node, className = "" }: { node: Node; className?: string }) {
  return (
    <div className={`prose prose-lg prose-article max-w-none lg:prose-xl ${className}`}>
      {Markdoc.renderers.react(renderable(node), React)}
    </div>
  );
}
