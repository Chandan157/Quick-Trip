import React from "react";
import "./workProgress.scss";
import Container from "../../../layout/container/Container";

const WorkProgress = () => {
  return (
    <section className="work_progress">
      <Container>
        <div className="work_progress_container">
          <div className="heading">
            <h1 className="main_heading">How it work</h1>
            <p>Keep calm & travel on</p>
          </div>
          <img
            className="work_progress_connection_line"
            src="/assets/work/connection-line.svg"
            alt="connection-line"
          />
          <div className="work_progress_wrapper">
            <div className="work_progress_item">
              <img src="/assets/work/work1.png" alt="work-1" />
              <h3>Book & relax</h3>
              <p>
                Let each trip be an inspirational journey, each room a peaceful
                space
              </p>
            </div>
            <div className="work_progress_item">
              <img src="/assets/work/work2.png" alt="work-2" />
              <h3>Smart checklist</h3>
              <p>
                Let each trip be an inspirational journey, each room a peaceful
                space
              </p>
            </div>
            <div className="work_progress_item">
              <img src="/assets/work/work3.png" alt="work-3" />
              <h3>Save more</h3>
              <p>
                Let each trip be an inspirational journey, each room a peaceful
                space
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WorkProgress;
