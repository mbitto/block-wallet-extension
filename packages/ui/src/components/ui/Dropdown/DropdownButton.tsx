import classnames from "classnames"
import { DropdownCompoundMember } from "./Dropdown"
import useIsHovering from "../../../util/hooks/useIsHovering"
import OutlinedButton from "../OutlinedButton"
import Icon, { IconName } from "../Icon"
import { useDropdownContext } from "./DropdownContext"
import { Children, cloneElement, FC, PropsWithChildren } from "react"

//Button
export interface DropdownButtonBaseProps {
    onClick?: (e: any) => void
    isShowingMenu?: boolean
}

interface DropdownIconButtonProps extends DropdownButtonBaseProps {
    iconName: IconName
}

export const DropdownButton: FC<PropsWithChildren<{}>> &
    DropdownCompoundMember = ({ children }) => {
    const { isShowingMenu, toggleMenu } = useDropdownContext()
    return (
        <>
            {Children.map(children, (child) => {
                if (!child) return null
                const childNode = child as React.ReactElement<any>
                return cloneElement(child as React.ReactElement<any>, {
                    ...childNode.props,
                    onClick: (e: any) => {
                        if (childNode.props.onClick) {
                            childNode.props.onClick(e)
                        }
                        return toggleMenu(e)
                    },
                    isShowingMenu,
                })
            })}
        </>
    )
}

export const DropdownIconButton: React.FC<DropdownIconButtonProps> = ({
    iconName,
    onClick,
    isShowingMenu,
}) => {
    const { isHovering, getIsHoveringProps } = useIsHovering()
    return (
        <div
            {...getIsHoveringProps()}
            className={classnames(
                "p-2 transition duration-300 rounded-full hover:bg-primary-100 cursor-pointer select-none",
                isShowingMenu && "bg-primary-100"
            )}
            onClick={onClick}
        >
            <div className="w-4 h-4 flex items-center justify-center">
                <Icon
                    name={iconName || IconName.THREE_DOTS}
                    profile={
                        isHovering || isShowingMenu ? "selected" : "default"
                    }
                />
            </div>
        </div>
    )
}

export const DropdownOutlinedIconButton: React.FC<DropdownIconButtonProps> = ({
    onClick,
    iconName,
    isShowingMenu,
}) => {
    return (
        <OutlinedButton
            className={isShowingMenu ? "!bg-primary-100" : ""}
            onClick={onClick}
        >
            <Icon
                name={iconName}
                profile={isShowingMenu ? "selected" : "default"}
            />
        </OutlinedButton>
    )
}
