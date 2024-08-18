import { useCalandar } from "../hooks/useCalandar";

export default function Labels() {
  const { labels, updateLabel } = useCalandar();
  return (
    <div>
      <p className="text-gray-500 font-bold mt-10">Label</p>
      {labels.map(({ label: lbl, labelName: lblName, checkBoxColor: bgColor,  checked }, idx) => {
        const bg = bgColor;
        return (
          <label key={idx} className="items-center mt-3 block ">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => updateLabel({ label: lbl, labelName:  lblName, checkBoxColor: bgColor, checked: !checked })}
              className={` h-5 w-5 ${bg}  rounded focus:ring-0 cursor-pointer`}
            />
            <span className="ml-2 text-gray-500  capitalize">{lblName}</span>
          </label>
        );
      })}
    </div>
  );
}