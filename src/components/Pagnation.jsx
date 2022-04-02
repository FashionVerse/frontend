import * as React from 'react';
import styles from "../styles/pagnation.module.css"
import gsap from "gsap";

export default function Test(){
	const [currentPage, setCurrentPage] = React.useState(1);
    React.useEffect(() => {
        const buttons = document.querySelectorAll("#num button");
const select = document.querySelector("#select");

buttons.forEach(button => {
	button.addEventListener("pointerenter", mouseEnter);
});

function mouseEnter(e) {
	const target = e.currentTarget;

	gsap.to(select, {
		duration: 2,
		x: target.offsetLeft - 40,
        ease: "elastic.out(0.2, 0.2)"
	});
}
    }, [])
    return(
        <div className="tw-flex tw-items-center tw-justify-center tw-h-screen">
        <div className={styles.pagination}>
	    <ul className={styles.dots}>
		<li id="select" className={styles.select}></li>
        <li className={styles.dot}></li>
        <li className={styles.dot}></li>
		<li className={styles.dot}></li>
		<li className={styles.dot}></li>
		<li className={styles.dot}></li>
        <li className={styles.dot}></li>
        <li className={styles.dot}></li>
	</ul>
	<ul id="num" className={styles.buttons}>
		<li className={styles.button}><button>&lt;</button></li>
		<li className={styles.button}><button >1</button></li>
        <li className={styles.button}><button>2</button></li>
        <li className={styles.button}><button>3</button></li>
		<li className={styles.button}><button>...</button></li>
		<li className={styles.button}><button>5</button></li>
		<li className={styles.button}><button>&gt;</button></li>
	</ul>
</div>
        </div>
    )
}