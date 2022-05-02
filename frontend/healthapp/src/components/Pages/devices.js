import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Devices = () => {
    const [pdevice, setPatientDevices] = useState(null);
    const [ddevice, setDoctorDevices] = useState(null);
    useEffect(
        () => {
          if (window.name.includes(['@'])) {
            axios.get(`https://ec530-project2-nicolekwon.azurewebsites.net/patientdevice/` + window.name)
            .then(res => {
                let devices = JSON.stringify(res.data, null, "\t"); 
                setPatientDevices(devices);
              })
            axios.get(`https://ec530-project2-nicolekwon.azurewebsites.net/doctordevice/` + window.name)
            .then(res => {
                let devices = JSON.stringify(res.data, null, "\t"); 
                setDoctorDevices(devices);
            })
          }
        }
      );

    return (
        window.name.includes(['@']) ?
        <div>
            <div class="row">
                <h1>Your Devices</h1>
            </div>
            <div class="row">
                <pre>{pdevice}</pre>
            </div>
            <div class="row">
                <pre>{ddevice}</pre>
            </div>
        </div>
        :
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
            <h1>Devices</h1>
        </div>
    )
}

export default Devices;