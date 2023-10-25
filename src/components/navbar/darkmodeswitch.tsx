import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import {SunIcon} from "./sun-icon";
import {MoonIcon} from "./moon-icon";

export const DarkModeSwitch = () => {
  const { setTheme, theme } = useNextTheme();
  return (
    <Switch
        isSelected={theme === "dark"}
        size="lg"
        color="secondary"
        onValueChange={(e) => setTheme(e ? "dark" : "light")}
        thumbIcon={({ isSelected, className }) =>
            isSelected ? (
                <SunIcon className={className} />
            ) : (
                <MoonIcon className={className} />
            )
        }
    >
    </Switch>
  );
};


