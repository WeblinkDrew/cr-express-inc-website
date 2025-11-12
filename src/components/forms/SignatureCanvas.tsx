"use client";

import { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignatureCanvasProps {
  value: string;
  onChange: (signature: string) => void;
  label?: string;
  required?: boolean;
}

export default function SignatureCanvasComponent({
  value,
  onChange,
  label = "Signature",
  required = false,
}: SignatureCanvasProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);

  // Load existing signature when component mounts
  useEffect(() => {
    if (value && sigCanvas.current) {
      sigCanvas.current.fromDataURL(value);
    }
  }, []);

  const clear = () => {
    sigCanvas.current?.clear();
    onChange("");
  };

  const handleEnd = () => {
    if (sigCanvas.current) {
      const dataUrl = sigCanvas.current.toDataURL();
      onChange(dataUrl);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border-2 border-neutral-300 rounded-lg bg-white">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: "w-full h-40 touch-action-none cursor-crosshair",
            style: { touchAction: "none" },
          }}
          onEnd={handleEnd}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-neutral-500">
          Use your mouse or finger to draw your signature above
        </p>
        <button
          type="button"
          onClick={clear}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
