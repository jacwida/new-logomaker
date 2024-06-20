import { Slider } from "./ui/slider";
import ColorsPicker from "./color-picker";
import { useContext, useEffect, useState } from "react";

import { StorageContext } from "@/context/storage-context";
import AllIcons from "./all-icons";

const IconController = ({ storageValue }) => {
  const [size, setSize] = useState(storageValue ? storageValue?.iconSize : 200);
  const [rotate, setRotate] = useState(
    storageValue ? storageValue?.iconRotate : 0
  );
  const [borderWidth, setBorderWidth] = useState(2.5);
  const [borderColor, setBorderColor] = useState("#fff");
  const [fillColor, setFillColor] = useState(
    storageValue ? storageValue?.iconFillColor : "#000"
  );
  const [fillOpacity, setFillOpacity] = useState(1);

  const [icon, setIcon] = useState(
    storageValue ? storageValue?.icon : "Activity"
  );

  const { updateStorage, setUpdateStorage } = useContext(StorageContext);

  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      iconSize: size,
      IconBorderWidth: borderWidth,
      iconRotate: rotate,
      iconBorderColor: borderColor,
      iconFillColor: fillColor,
      iconFillOpacity: fillOpacity,
      icon: icon,
    };

    setUpdateStorage(updatedValue);
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [size, rotate, fillOpacity, borderColor, fillColor, borderWidth, icon]);
  return (
    <div className="w-full border-r p-3 flex flex-col gap-8 overflow-auto h-screen">
      <div className="flex justify-between">
        <p className="text-sm">Icon</p>
        <p className="text-sm">{icon}</p>
      </div>

      <AllIcons storageValue={storageValue} selectedIcon={setIcon} />

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm">Size</p>
          <p className="text-xs">{size} px</p>
        </div>

        <Slider
          defaultValue={[size]}
          max={500}
          step={1}
          onValueChange={(e) => setSize(e[0])}
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm">Rotate</p>
          <p className="text-xs">{rotate}°</p>
        </div>

        <Slider
          defaultValue={[rotate]}
          max={360}
          step={1}
          onValueChange={(e) => setRotate(e[0])}
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm">Border width</p>
          <p className="text-xs">{borderWidth} px</p>
        </div>

        <Slider
          defaultValue={[borderWidth]}
          max={10}
          step={1}
          onValueChange={(e) => setBorderWidth(e[0])}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm">Border Color</p>
        </div>
        <div className="">
          <ColorsPicker selectedColor={(color) => setBorderColor(color)} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm">Fill opacity</p>
          <p className="text-xs">{fillOpacity} %</p>
        </div>

        <Slider
          defaultValue={[fillOpacity]}
          max={100}
          step={1}
          onValueChange={(e) => setFillOpacity(e[0])}
        />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm">Fill Color</p>
        </div>
        <div className="">
          <ColorsPicker selectedColor={(color) => setFillColor(color)} />
        </div>
      </div>
      <div className="my-8"></div>
    </div>
  );
};

export default IconController;
