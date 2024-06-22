import { Button } from "./ui/button";

const Buttons = ({ setActive, active }) => {
  const BUTTONS = ["Icon", "BackGround"];

  return (
    <div className="flex flex-row  md:flex-col justify-between w-full border-b md:border-b-0 md:border-r md:h-screen p-3 py-6">
      <div className="flex flex-row md:flex-col gap-16 md:justify-start md:gap-3">
        {BUTTONS.map((itm, idx) => (
          <Button
            key={idx}
            onClick={() => setActive(idx)}
            variant={active === idx ? "default" : "secondary"}
          >
            {itm}
          </Button>
        ))}
      </div>

      <div className="hidden md:block">
        <p>App by jac wida</p>
      </div>
    </div>
  );
};

export default Buttons;
