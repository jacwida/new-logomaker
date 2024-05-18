import { Button } from "./ui/button";

const Buttons = ({ setActive, active }) => {
  const BUTTONS = ["Icon", "BackGround"];

  return (
    <div className="flex  flex-col justify-between w-full border-r h-screen p-3 py-6">
      <div className="flex flex-col gap-3">
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

      <div>
        <p>App by jac wida</p>
      </div>
    </div>
  );
};

export default Buttons;
