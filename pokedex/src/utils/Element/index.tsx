import styles from './index.module.css';

type ElementProps = {
    type: string[];
};

export const Element: React.FC<ElementProps> = ({ type }) => {
    let badgeContainerClass = styles.badge_container_yellow;

    if (type.includes('grass') || type.includes('bug')) {
        badgeContainerClass = styles.badge_container_green;
    } else if (type.includes('stile') || type.includes('dark') || type.includes('rock')) {
        badgeContainerClass = styles.badge_container_gray;
    } else if (type.includes('water') || type.includes('ice')) {
        badgeContainerClass = styles.badge_container_blue;
    } else if (type.includes('fire') || type.includes('fighting') || type.includes('dragon')) {
        badgeContainerClass = styles.badge_container_red;
    } else if (type.includes('normal') || type.includes('ghost')) {
        badgeContainerClass = styles.badge_container_light_blue;
    } else if (type.includes('poison') || type.includes('psychic') || type.includes('fairy') || type.includes('ghost')) {
        badgeContainerClass = styles.badge_container_purple;
    } else if (type.includes('ground')) {
        badgeContainerClass = styles.badge_container_brown;
    }

    return (
        <article className={badgeContainerClass}>
            <span className={styles.badge_text}>
                {type}
            </span>
        </article>
    );
};