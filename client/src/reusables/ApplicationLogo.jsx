import ChefHat from "../assets/chef-hat.png"

export default function ApplicationLogo() {
    return (
        <img
        src={ChefHat}
        alt="chef hat"
        width={50}
        className="bg-[#D9D9D9] p-1 rounded-full"
      />
    );
}
