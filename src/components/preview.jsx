import { StorageContext } from "@/context/storage-context";
import html2canvas from "html2canvas";
import { icons } from "lucide-react";
import { useContext, useEffect } from "react";
import ReactDOMServer from "react-dom/server";

const Preview = ({ downloadIcon, storageValue, downloadSvg }) => {
  const { updateStorage } = useContext(StorageContext);

  useEffect(() => {
    if (downloadIcon) {
      downloadPng();
    }
  }, [downloadIcon]);

  useEffect(() => {
    if (downloadSvg) {
      downloadSvgImage();
    }
  }, [downloadSvg]);

  const downloadSvgImage = () => {
    const downloadlogodiv = document.getElementById("downloadlogodiv");

    if (!downloadlogodiv) {
      console.error("Downloadable div not found.");
      return;
    }

    const svgElement = createSvgElementFromDiv(downloadlogodiv);

    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svgElement)], {
      type: "image/svg+xml",
    });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "icon.svg";
    downloadLink.click();
    URL.revokeObjectURL(svgUrl);
  };

  const createSvgElementFromDiv = (div) => {
    const { bgColor, bgRounded, iconFillColor, icon, iconSize, iconRotate } =
      storageValue;

    const LucidIcon = icons[icon];

    if (!LucidIcon) {
      console.error(`Icon "${icon}" not found.`);
      return null;
    }

    const iconElement = (
      <LucidIcon
        color={iconFillColor}
        size={iconSize}
        style={{ transform: `rotate(${iconRotate}deg)` }}
      />
    );

    const iconSvgString = ReactDOMServer.renderToStaticMarkup(iconElement);
    const iconSvgElement = new DOMParser().parseFromString(
      iconSvgString,
      "image/svg+xml"
    ).documentElement;

    const divRect = div.getBoundingClientRect();
    const width = divRect.width;
    const height = divRect.height;

    const svgWrapper = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgWrapper.setAttribute("width", width.toString());
    svgWrapper.setAttribute("height", height.toString());
    svgWrapper.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    // Apply background styles
    const backgroundRect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    backgroundRect.setAttribute("width", "100%");
    backgroundRect.setAttribute("height", "100%");
    backgroundRect.setAttribute("fill", bgColor);
    backgroundRect.setAttribute("rx", bgRounded);
    backgroundRect.setAttribute("ry", bgRounded);

    svgWrapper.appendChild(backgroundRect);

    // Center the icon within the SVG and apply rotation
    const iconGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    iconGroup.setAttribute(
      "transform",
      `translate(${width / 2}, ${height / 2}) rotate(${iconRotate})`
    );

    const iconWidth = parseInt(iconSvgElement.getAttribute("width"));
    const iconHeight = parseInt(iconSvgElement.getAttribute("height"));

    const innerSvg = new DOMParser().parseFromString(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${iconWidth}" height="${iconHeight}" x="${
        -iconWidth / 2
      }" y="${-iconHeight / 2}">
         ${iconSvgElement.outerHTML}
       </svg>`,
      "image/svg+xml"
    ).documentElement;

    iconGroup.appendChild(innerSvg);
    svgWrapper.appendChild(iconGroup);

    return svgWrapper;
  };

  const Icon = ({ name, color, size, rotate }) => {
    const LucidIcon = icons[name];

    if (!LucidIcon) {
      console.error(`Icon "${name}" not found.`);
      return null;
    }

    return (
      <LucidIcon
        color={color}
        size={size}
        style={{ transform: `rotate(${rotate}deg)` }}
      />
    );
  };

  const downloadPng = () => {
    const downloadlogodiv = document.getElementById("downloadlogodiv");

    html2canvas(downloadlogodiv, {
      backgroundColor: null,
    }).then((canvas) => {
      const pngimage = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngimage;
      downloadLink.download = "icon.png";
      downloadLink.click();
    });
  };

  return (
    <div className="w-full p-3 md:h-screen  bg-slate-100 flex justify-center items-center">
      <div
        className="md:w-[500px] md:h-[500px] w-[300px] h-[300px] bg-slate-50 border-dashed border"
        style={{
          padding: storageValue?.bgPadding,
        }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          id="downloadlogodiv"
          style={{
            background: storageValue?.bgColor,
            borderRadius: storageValue?.bgRounded,
          }}
        >
          <Icon
            color={storageValue?.iconFillColor}
            name={storageValue?.icon}
            size={storageValue?.iconSize}
            rotate={storageValue?.iconRotate}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
