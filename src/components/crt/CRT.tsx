import React from 'react'
import st from "./crt.module.css";

interface CRTProps {
	children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined
}

const CRT = (props: CRTProps) => {
	return (
		<div className="crt" style={{ height: "800px", filter: "url(#SphereMapTest)" }}>
			<div
				id="filters"
				style={{ display: "none", position: "absolute", top: "-9999", zIndex: 0, visibility: "hidden" }}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
					id="svg-root" width="381" height="166" z-index="-1"
				>
					<defs>
						<filter id="SphereMapTest" filterUnits="objectBoundingBox" x="-0.3" y="-1.3" width="1.6" height="3.5">
							<feImage id="mapa" result="Map" xlinkHref="img/sphere_wide_1.png"></feImage>
							<feDisplacementMap
								id="despMap" in="SourceGraphic" in2="map" scale="100"
								xChannelSelector="R" yChannelSelector="G"
							></feDisplacementMap>
						</filter>
					</defs>
				</svg>
			</div>

			{/* <div id="about" className="windows" style={{ top: "100px", left: "50px", width: "546px", height: "502px", border: "1px solid white" }}>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, est perspiciatis, voluptatum molestias distinctio odit numquam illo iusto et quasi maiores repellendus porro voluptates dolorem ad harum hic repudiandae sed debitis reiciendis cumque! Cum labore laudantium ratione unde dolorem impedit id recusandae dolore adipisci aspernatur sint nemo necessitatibus esse dicta aut fuga quo eos obcaecati, nihil ab voluptate totam, asperiores quia quod. Eius magni soluta obcaecati voluptatibus. Libero distinctio debitis dolorum illo aperiam cumque maiores porro sapiente, dolorem accusamus deleniti ducimus in earum ad nisi illum a consequatur velit vero sed. Tenetur officia iure nihil animi eius culpa quibusdam iusto.
					</div> */}

			{/* <img src="img/test.png" alt="test.png"
						style={{
							position: 'fixed',
							width: "90vw",
							height: "90vh",
							left: -413,
							top: 63
						}}
					/> */}

			<div
				style={{
					position: 'fixed',
					width: "90vw",
					height: "90vh",
					left: -636,
					top: 32
				}}
			>
				{props.children}
			</div>

		</div>
	)
}

export default CRT