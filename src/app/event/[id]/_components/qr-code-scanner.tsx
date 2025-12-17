"use client";

import {
  boundingBox,
  IDetectedBarcode,
  Scanner,
} from "@yudiel/react-qr-scanner";
import { toast } from "sonner";

const QrCodeScanner = ({
  update,
}: {
  update: (data: IDetectedBarcode) => void;
}) => {
  return (
    <div className="w-60 aspect-square">
      <Scanner
        formats={["qr_code"]}
        onScan={(result) => update(result[0])}
        onError={() => toast.error("Camera permission denied.")}
        allowMultiple={false}
        scanDelay={1000}
        components={{
          finder: false,
          zoom: false,
          tracker: boundingBox,
        }}
        styles={{
          video: { objectFit: "cover" },
        }}
      />
    </div>
  );
};

export default QrCodeScanner;
