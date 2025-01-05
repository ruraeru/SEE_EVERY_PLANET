import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="fixed bottom-0 p-5 bg-black w-full flex justify-center items-center">
            <ul className="flex items-center justify-around w-full">
                <li>
                    <Link href="/intro">
                        intro
                    </Link>
                </li>
                <Link href="/main">
                    main
                </Link>
                <Link href="/my">
                    my
                </Link>
            </ul>
        </nav>
    )
}