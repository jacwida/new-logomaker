import { Slider } from "./ui/slider";
import ColorsPicker from "./color-picker";
import { useContext, useEffect, useState } from "react";
import { StorageContext } from "@/context/storage-context";

const BackGroundController = ({ storageValue }) => {
  const [rounded, setRounded] = useState(storageValue?.bgRounded ?? 35);

  const [padding, setPadding] = useState(storageValue?.bgPadding ?? 40);
  const [color, setColor] = useState(storageValue?.bgColor ?? "#000");

  const { updateStorage, setUpdateStorage } = useContext(StorageContext);

  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: color,
    };

    setUpdateStorage(updatedValue);
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [rounded, padding, color]);

  return (
    <div className="w-full border-r p-3 flex flex-col gap-8 overflow-auto h-screen ">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm">Rounded</p>
          <p className="text-xs">{rounded} px</p>
        </div>

        <Slider
          defaultValue={[rounded]}
          max={300}
          step={1}
          onValueChange={(e) => setRounded(e[0])}
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm">Padding</p>
          <p className="text-xs">{padding}px</p>
        </div>

        <Slider
          defaultValue={[padding]}
          max={100}
          step={1}
          onValueChange={(e) => setPadding(e[0])}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm">Background Color</p>
        </div>
        <div className="">
          <ColorsPicker selectedColor={(color) => setColor(color)} />
        </div>
      </div>
      <div className="my-8"></div>
    </div>
  );
};

export default BackGroundController;
