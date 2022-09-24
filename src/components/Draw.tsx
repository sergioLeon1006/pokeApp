import React,{useRef} from 'react'
import CanvasDraw from "react-canvas-draw";
import {NavBar} from './index'

export default function Draw() {

    const canvas:any = useRef()
    const cleanCanvan = () => {
        canvas.current.clear()
    }
    const undo = () => {
        canvas.current.undo()
    }
    const complete = () => {
        const data:any  = JSON.parse(canvas.current.getSaveData());
        const vertices  = data.lines;
        let x = 0;
        console.log(vertices);
        for (let index = 0; index < vertices.length; index++) {
             x = vertices[index].points[0][x];
            
        }
        canvas.current.loadSaveData(JSON.stringify(data))
    }
    return (
        <>
         <NavBar></NavBar>
            <section className="py-5">
                <div className="flex flex-col max-w-6xl mx-auto space-y-4  ">
                    <div className="row">
                        <div className="col ">
                            <CanvasDraw className="mx-auto" ref={canvas} brushRadius={1}  catenaryColor="red"></CanvasDraw>
                        </div>
                        <div className="row justify-content-center text-center">
                            <div className="col ">
                                <button onClick={cleanCanvan} type="button" className="btn btn-outline-success">Reset</button>
                                <button onClick={undo} type="button" className="btn btn-outline-secondary">Undo</button>
                                <button onClick={complete} type="button" className="btn btn-outline-primary">complete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
