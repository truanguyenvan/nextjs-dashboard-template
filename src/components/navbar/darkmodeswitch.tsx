import React, {useEffect, useState} from "react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import {SunIcon} from "./sun-icon";
import {MoonIcon} from "./moon-icon";

export const DarkModeSwitch = () => {
    const { setTheme } = useTheme();
    const [clientTheme, setClientTheme] = useState("")

    useEffect(() => {
        setClientTheme(localStorage?.getItem("theme"))
    }, [])


    return (
        <Switch
            isSelected = {clientTheme === "dark"}
            size="lg"
            color="secondary"
            onValueChange={(e) =>
            {
                const theme = e? "dark" : "light"
                setClientTheme(theme)
                setTheme(theme)
            }}
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


