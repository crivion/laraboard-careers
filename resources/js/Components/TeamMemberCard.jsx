export default function TeamMemberCard() {
    return (
        <div class="p-2 mb-4">
            <a href="">
                <img
                    src="https://picsum.photos/300/200"
                    alt="logo"
                    class="rounded-tr rounded-tl w-full"
                />
            </a>

            <div class="bg-white shadow pt-5 px-2 pb-5 rounded-bl rounded-br">
                <div class="font-semibold text-lg block">Cristhian Noboa</div>
                <div className="text-neutral-700 block">Job Title Here</div>
            </div>
        </div>
    );
}
