// helper function to handle the arrow component that sorts by column
function SortArrowSection({ sortType, handleSortChanging }) {
    const getIcon = () => {
        if (sortType === 'ASC') {
            return <i className="bx bx-caret-up" onClick={() => handleSortChanging('DESC')} />;
        } else if (sortType === 'DESC') {
            return <i className="bx bx-caret-down" onClick={() => handleSortChanging('ASC')} />;
        } else {
            return <i className="bx bx-reflect-horizontal" onClick={() => handleSortChanging('ASC')} />;
        }
    };

    return <section className="pointer">{getIcon()}</section>;
};

export default SortArrowSection
