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
      return storageData ? JSON.parse(storageData) : {};
    }
    return {};
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageData = localStorage.getItem("value");
      if (storageData) {
        setStorageValue(JSON.parse(storageData));
      }
    }
  }, [updateStorage]);

  return (
    <StorageContext.Provider value={{ updateStorage, setUpdateStorage }}>
      <main className=" max-w-screen-2xl mx-auto">
        <header className="px-2 fixed top-0 backdrop-blur-lg py-2 flex justify-between border-b shadow-sm  w-full z-50 ">
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
        <div className="mt-12 flex">
          <div className="w-64 fixed">
            <Buttons setActive={setActive} active={active} />
          </div>
          <div className=" flex-1 flex ml-64">
            <div className="w-4/12 mb-16 overflow-y-auto">
              {active === 0 ? (
                <IconController storageValue={storageValue} />
              ) : (
                <BackGroundController storageValue={storageValue} />
              )}
            </div>
            <div className="w-8/12 px-4">
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
