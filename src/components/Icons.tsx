import {ReactComponent as filledHeartSvg} from "./../assets/filled_heart.svg";
import {ReactComponent as hollowHeartSvg} from "./../assets/hollow_heart.svg";
import {ReactComponent as hollowHeartGraySvg} from "./../assets/hellow_heart_gray.svg";
import {ReactComponent as ArrowSvg} from "./../assets/arrow.svg";
import {ReactComponent as UnderlineSvg} from "./../assets/underline.svg";

type IconType =
    | "filledHeart"
    | "hollowHeart"
    | "arrow"
    | "hollowHeartGray"
    | "underline";

type IconComponents = Record<
    IconType,
    React.FunctionComponent<React.SVGProps<SVGSVGElement>>
>;

const iconComponents: IconComponents = {
    filledHeart: filledHeartSvg,
    hollowHeart: hollowHeartSvg,
    arrow: ArrowSvg,
    hollowHeartGray: hollowHeartGraySvg,
    underline: UnderlineSvg,
};

interface IconComponentProps {
    iconType: IconType;
    style?: React.CSSProperties;
}
const IconComponent: React.FC<IconComponentProps> = ({iconType, style}) => {
    const Icon = iconComponents[iconType] || hollowHeartSvg;

    return (
        <div style={style}>
            {typeof Icon === "string" ? <span>{Icon}</span> : <Icon />}
        </div>
    );
};

export default IconComponent;
