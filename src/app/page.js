"use client";

import BackGroundController from "@/components/background-controller";
import Buttons from "@/components/buttons";
import IconController from "@/components/icon-controller";
import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StorageContext } from "@/context/storage-context";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [active, setActive] = useState(0);
  const [downloadIcon, setDownloadIcon] = useState();
  const [downloadSvg, setDownloadSvg] = useState();

  const [updateStorage, setUpdateStorage] = useState({});
  const [storageValue, setStorageValue] = useState(() => {
    if (typeof window !== "undefined") {
      const storageData = localStorage.getItem("value");
      return JSON.parse(storageData);
    }
  });

  function initializeLocalStorage() {
    const defaultValues = {
      iconSize: 200,
      iconRotate: 0,
      iconFillColor: "#fff",
      icon: "Activity",
      IconBorderWidth: 2.5,
      iconBorderColor: "#ffffff",
      iconFillOpacity: 1,

      bgRounded: 35,
      bgPadding: 40,
      bgColor: "#000",
    };

    if (!localStorage.getItem("value")) {
      localStorage.setItem("value", JSON.stringify(defaultValues));
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeLocalStorage();
      const storageData = localStorage.getItem("value");
      if (storageData) {
        setStorageValue(JSON.parse(storageData));
      }
    }
  }, [updateStorage]);

  return (
    <StorageContext.Provider value={{ updateStorage, setUpdateStorage }}>
      <main className=" max-w-screen-2xl mx-auto">
        <header className="px-2 fixed top-0 left-0 backdrop-blur-lg py-2 flex justify-between border-b shadow-sm  w-full z-50 ">
          <div className="flex gap-2 items-center">
            <img src="/icon.svg" alt="logo" className="w-7 h-7" />

            <h1 className="font-semibold">LogoMaker</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="flex gap-2 font-semibold">
                Download
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setDownloadSvg(Date.now())}
                className="cursor-pointer"
              >
                Download SVG
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setDownloadIcon(Date.now())}
                className="cursor-pointer"
              >
                Download PNG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="mt-12 flex flex-col md:flex-row">
          <div className="w-full md:w-64 md:fixed">
            <Buttons setActive={setActive} active={active} />
          </div>
          <div className=" md:flex-1 flex flex-col-reverse md:flex-row w-full md:ml-64">
            <div className="w-full md:w-4/12 mb-16 overflow-y-auto">
              {active === 0 ? (
                <IconController storageValue={storageValue} />
              ) : (
                <BackGroundController storageValue={storageValue} />
              )}
            </div>
            <div className="w-full md:w-8/12 px-4">
              <Preview
                downloadIcon={downloadIcon}
                storageValue={storageValue}
                downloadSvg={downloadSvg}
              />
            </div>
          </div>
        </div>
      </main>
    </StorageContext.Provider>
  );
}
