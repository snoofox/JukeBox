import React from "react";
import { Flex, Icon } from "@chakra-ui/react";

const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    
    return (
        <Flex
            align="center"
            px="4"
            pl="4"
            py="3"
            cursor="pointer"
            _dark={{ color: "gray.400" }}
            _hover={{
                bg: "gray.100",
                _dark: { bg: "gray.900" },
                color: "teal.400",
            }}
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            {...rest}
        >
            {icon && (
                <Icon
                    mx="2"
                    boxSize="4"
                    _groupHover={{
                        color: "teal.400",
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};

export default NavItem;