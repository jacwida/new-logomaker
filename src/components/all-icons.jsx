import { icons } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const AllIcons = ({ selectedIcon, storageValue }) => {
  const [icon, setIcon] = useState(
    storageValue ? storageValue?.icon : "Activity"
  );
  const Icon = ({ name, color, size }) => {
    const LucidIcon = icons[name];

    if (!LucidIcon) {
      console.error(`Icon "${name}" not found.`);
      return null;
    }

    return <LucidIcon color={color} size={size} />;
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button
            variant="secondary"
            size="icon"
            className="my-1 py-4  font-bold"
          >
            <Icon name={icon} color="#000" size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="h-auto md:h-[70dvh] w-[95%] md:w-lvw overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pick Any Icon</DialogTitle>
            <DialogDescription>
              <div className="my-3 grid gap-6  grid-cols-4 md:grid-cols-6">
                {Object.keys(icons).map((icon) => (
                  <div
                    key={icon}
                    className="border p-2 rounded-sm flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      selectedIcon(icon);
                      setIcon(icon);
                    }}
                  >
                    <DialogClose className="mr-0">
                      <Icon name={icon} color="#000" size={20} />
                    </DialogClose>
                  </div>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllIcons;
