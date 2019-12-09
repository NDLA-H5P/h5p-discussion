import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import {Draggable} from "react-beautiful-dnd";

function Element(props) {

    const {
        children,
        draggableId,
        dragIndex,
        disableTransform,
        ariaLabel,
    } = props;

    return (
        <Draggable
            draggableId={draggableId}
            index={dragIndex}
        >
            {(provided, snapshot) => {
                return (
                    <div
                        className={"h5p-discussion-draggable-container"}
                        aria-label={ariaLabel}
                    >
                        <ElementLayout
                            provided={provided}
                            snapshot={snapshot}
                            ariaLabel={ariaLabel}
                        >
                            {children}
                        </ElementLayout>
                    </div>
                )
            }}
        </Draggable>
    );
}

Element.propTypes = {
    draggableId: PropTypes.string,
    dragIndex: PropTypes.number,
    disableTransform: PropTypes.bool,
    ariaLabel: PropTypes.string,
};

function ElementLayout({children, provided, snapshot}) {
    return (
        <div
            className={classnames("h5p-discussion-draggable-element", {
                'h5p-discussion-active-draggable': snapshot.isDragging,
            })}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
        >
            {children}
        </div>
    );
}

ElementLayout.propTypes = {
    provided: PropTypes.object,
    snapshot: PropTypes.object,
    ariaLabel: PropTypes.string,
};

export {
    Element as default,
    ElementLayout,
};
