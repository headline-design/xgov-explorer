

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Button from "./rust-button";
import { IconMoon } from "@/icons/rust/moon";
import { IconSun } from "@/icons/rust/sun";


export default function ThemeToggle() {
    const { theme: resolvedTheme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            const item = window.localStorage.getItem("theme");
            if (item) {
                if (item === "dark") {
                    setTheme("dark");
                } else {
                    setTheme("light");
                }
            }
        }
    }, [isMounted, setTheme]);

    if (!isMounted) return null;

    return (
        <Button
            slim
            variant="outline"
            icon={resolvedTheme === "light" ? <IconMoon /> : <IconSun />}
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        />

    );
}
