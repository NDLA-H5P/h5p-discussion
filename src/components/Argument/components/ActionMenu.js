import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TinyPopover from "react-tiny-popover";
import classnames from 'classnames';
import trash from '@assets/trash.svg';
import {DiscussionContext} from "context/DiscussionContext";
import {getBox} from 'css-box-model';

function ActionMenu(props) {

    const context = useContext(DiscussionContext);
    const {
        translate
    } = context;
    const {
        children,
        show,
        handleClose,
        actions,
        classNames = [],
        innerRef,
    } = props;


    classNames.push("h5p-discussion-actionmenu");

    function handleSelect(callback) {
        handleClose();
        callback();
    }

    function handleKeyUp(event, callback) {
        if (event.keyCode === 13) {
            handleSelect(callback);
        }
    }

    const parentBox = getBox(innerRef);

    function getCategory(settings, index) {

        let label;
        if (settings.label) {
            label = (<span
                id={"action-" + index}
                className={"h5p-discussion-popover-actionmenu-labeltext"}
            >
                {settings.label}
                </span>);
        } else {
            label = (
                <span
                    id={"action-" + index}
                    className={"h5p-discussion-popover-actionmenu-labeltext"}
                >
                     {translate('moveTo')} "<span>{settings.title}</span>"
                </span>

            );
        }

        return (
            <label
                tabIndex={0}
                onKeyUp={event => handleKeyUp(event, settings.onSelect)}
            >
                <input
                    tabIndex={-1}
                    id={"input-" + settings.id}
                    value={settings.id}
                    type={"checkbox"}
                    checked={settings.activeCategory}
                    onChange={() => handleSelect(settings.onSelect)}
                    aria-labelledby={"action-" + index}
                />
                <span
                    className={classnames("h5p-ri", {
                        'hri-checked': settings.activeCategory,
                        'hri-unchecked': !settings.activeCategory,
                    })}/>
                {label}
            </label>
        );
    }

    function getDelete(settings) {
        return (
            <button
                className={"h5p-discussion-popover-actionmenu-delete"}
                onClick={e => {
                    e.preventDefault();
                    settings.onSelect();
                }}
            >
                <img
                    src={trash}
                    aria-hidden={true}
                    alt={translate('deleteArgument')}
                />
                <span
                    className={"h5p-discussion-popover-actionmenu-labeltext"}>{settings.title}</span>
            </button>
        );
    }

    return (
        <TinyPopover
            containerClassName={classNames.join(" ")}
            contentDestination={innerRef}
            contentLocation={() => {
                return {top: parentBox.borderBox.height, left: -(parentBox.padding.left + parentBox.border.left)}
            }}
            isOpen={show}
            position={["bottom"]}
            windowBorderPadding={0}
            disableReposition={true}
            onClickOutside={handleClose}
            content={() => (
                <div
                    className={"h5p-discussion-popover-actionmenu"}
                    role={"listitem"}
                >
                    <ul>
                        {actions.map((action, index) => {
                            let content;
                            if (action.type === 'delete') {
                                content = getDelete(action, index);
                            } else {
                                content = getCategory(action, index);
                            }
                            return (
                                <li
                                    key={"action-" + index}
                                >
                                    {content}
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        onClick={handleClose}
                        className={"visible-hidden"}
                    >{translate('close')}
                    </button>
                </div>
            )}
        >
            {children}
        </TinyPopover>
    );
}

ActionMenu.propTypes = {
    canDelete: PropTypes.bool,
    onDelete: PropTypes.func,
    actions: PropTypes.array,
    translate: PropTypes.func,
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    classNames: PropTypes.array,
    innerRef: PropTypes.object,
};

export default ActionMenu;