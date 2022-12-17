import { useRef } from 'react'
import cn from 'classnames'
import Logo from './images/exit.svg'

import cl from './style.module.scss'
import useOnClickOutside from "../../hooks/useOnClickOutside";

const CustomModal = ({
	winner,
	isOpen,
	closeModal,
	children
}) => {
	const modalContentRef = useRef(null)

	const modalClasses = cn(
		cl.modal,
		{[cl.modalIsOpen]: isOpen}
	)

	const clickOutsideHandler = () => closeModal()
	useOnClickOutside(modalContentRef, clickOutsideHandler)

	return (
		<div className={modalClasses}>
			<div className={cl.modalContainer}>
				<div ref={modalContentRef} className={cl.modalContent}>
					<div className={cl.modalHeader}>
						<h2>{`Победили: ${winner}`}</h2>
						<button
							className={cl.modalExit}
							onClick={closeModal}
						>
							<img src={Logo} alt="close"/>
						</button>
					</div>
					<div className={cl.modalBody}>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default CustomModal
