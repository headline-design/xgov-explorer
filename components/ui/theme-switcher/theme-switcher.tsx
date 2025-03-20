"use client";

import React from "react";
import { IconDeviceAlt, IconSun, IconMoon } from "@/icons/rust";
import styles from "./theme-switcher.module.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ThemeSwitcher() {
  const { theme: currentTheme, setTheme } = useTheme();
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
    <fieldset className={cn("tailwind", styles.themeSwitcherRoot)}>
      <legend className="sr-only">Select a display theme:</legend>
      <span style={{ height: "100%" }}>
        <input
          aria-label="dark"
          className="sr-only"
          id="theme-switch-dark-:r2i:"
          type="radio"
          value="dark"
          checked={currentTheme === "dark"}
          onChange={() => setTheme("dark")}
        />
        <label htmlFor="theme-switch-dark-:r2i:">
          <span className="sr-only">dark</span>
          <IconMoon />
        </label>
      </span>
      <span style={{ height: "100%" }}>
        <input
          aria-label="light"
          id="theme-switch-light-:r2i:"
          className="sr-only"
          type="radio"
          value="light"
          checked={currentTheme === "light"}
          onChange={() => setTheme("light")}
        />
        <label htmlFor="theme-switch-light-:r2i:">
          <span className="sr-only">light</span>
          <IconSun />
        </label>
      </span>
      <span style={{ height: "100%" }}>
        <input
          aria-label="system"
          id="theme-switch-system-:r2i:"
          type="radio"
          value="system"
          checked={currentTheme === "system"}
          className="sr-only"
          onChange={() => setTheme("system")}
        />
        <label htmlFor="theme-switch-system-:r2i:">
          <span className="sr-only">system</span>
          <IconDeviceAlt />
        </label>
      </span>
    </fieldset>
  );
}
