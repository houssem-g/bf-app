import React from "react";
import Navbar from '../../components/navbar';
import GeneralData from "../../components/generalData.tsx";
import styles from "../../styles/dashboard.module.css"
export const ExplorerView = () => {
    return (
        <div className={styles.bodyConatiner}>
            <div>
                <Navbar titles = {["Dashboard", "Explorer", "Governance"]}/>
            </div>
            <div className={styles.titleDashboard}>
                Discover our <br></br> <strong>OGY DASHBOARD</strong>
            </div>
            <div>
                <GeneralData />
            </div>

        </div>
    )
}