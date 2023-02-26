import React from 'react'
import st from "./crt.module.css";

interface CRTProps {
	children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined
}

const CRT = (props: CRTProps) => {
	return (
		<div className={st.crt}>
			<img className={st['crt-frame']} src="img/crt_green_mask.png" alt="crt_green_mask.png"></img>
			<div className={st['crt-content']}>
				<div id={st.filters}>
					<svg
						id="svg-root" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
						width="381" height="166" z-index="-1"
					>
						<defs>
							<filter
								id="SphereMapTest"
								filterUnits="objectBoundingBox"
								x="-0.3" y="-1.3"
								width="1.6" height="3.5"
							>
								<feImage
									id="mapa"
									result="Map"
									xlinkHref="img/sphere_wide_1.png"
								></feImage>
								<feDisplacementMap
									id="despMap"
									in="SourceGraphic" in2="map"
									scale="100"
									xChannelSelector="R" yChannelSelector="G"
								></feDisplacementMap>
							</filter>
						</defs>
					</svg>
				</div>

				<div id={st.content}>
					{props.children}
				</div>

			</div>
		</div>
	)
}

export default CRT