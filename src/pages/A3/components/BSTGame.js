import React from "react";
import { BinarySearchTree, useBinarySearchTree } from "react-tree-vis";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MDBContainer } from "mdbreact";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var arr = [];
let tmpArr = [];
let disabled = true;
for (let i = 0; i < getRandom(5, 7); i++) {
  let tmp = getRandom(5, 70);
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === tmp) {
      arr.splice(j, 1);
    }
  }
  arr.push(tmp);
  tmpArr = arr;
}

const getItems = (count) =>
  Array.from({ length: count }, (tmpArr, k) => k).map((k) => ({
    id: `item-${k + 1}`,
    content: `${tmpArr[k]}`,
  }));
// 重新記錄陣列順序
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  //刪除並記錄 刪除元素
  const [removed] = result.splice(startIndex, 1);
  //將原來的元素新增進陣列
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

function Showpdf() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDoucumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function changePage(offset) {
    setPageNumber((prePageNumber) => prePageNumber + offset);
  }
  function changePageBack() {
    changePage(-1);
  }
  function changePageNext() {
    changePage(+1);
  }
  return (
    <div className="pdfcontainer">
      <Document
        file="/BinarySearchTree.pdf"
        onLoadSuccess={onDoucumentLoadSuccess}
      >
        <Page height="1000" pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {pageNumber > 1 && (
          <Button variant="outline-dark" onClick={changePageBack}>
            Previous Page
          </Button>
        )}
        {pageNumber < numPages && (
          <Button variant="outline-dark" onClick={changePageNext}>
            Next Page
          </Button>
        )}
      </div>
    </div>
  );
}
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Binary Search Tree Interactive
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Showpdf />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Try it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function GameMyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adelson Velsky Landis Tree Interactive
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>How to play?</h3>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Go play!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function BSTGame() {
  const { ref, getData, generateRandomTree } = useBinarySearchTree();
  const [modalShow, setModalShow] = React.useState(false);
  const [gamemodalShow, setgameModalShow] = React.useState(true);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
  const [open, setOpen] = useState("hide");
  const [playergrade, setPlayergrade] = useState(0);
  const [aigrade, setAigrade] = useState(0);

  let tmp = [...record];

  function start() {
    var timer = document.querySelector(".timer");
    var number = 10;
    setInterval(function () {
      number--;
      if (number <= 0) number = 0;
      timer.innerText = number + 0;
    }, 1000);
  }

  return (
    <div className="A3">
      <div className="BSTgame">
        <div className="gamehintContainer" style={{ marginLeft: "250px" }}>
          <div className="loader"></div>
          <img
            className="gamerule"
            onClick={() => setgameModalShow(true)}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACUElEQVRoge2av04bQRDGfzoJYUVujBSUBJyGUFJZ4g3SJqGJ6IBXoCKv4LT0KYIipaBKlwKSUCXQ0URI/CmQsS0jKJyEAskpdiyfImNm9tbni3yftNrV+fb7Zry3s6udhR6eAltAC+ikXK6Bb8AqEJEA80BjBA70K1+BKR8nIuBASHaBGR8So96+6O2IXgk3GjV5fgAUrMRL0vkcKAYy1lfvCXAkv1etxB+l40ZCA0PpVYBb4A/w0EJ8KsSVJNYF1tuWd9YtxDfSqeRtmg0avWV555OWNJIOaUKj913qBS1pBFxIe85qkSc0eg2p1XMkAn5I+7mHUT7Q6P2W+oGF+BXphl+tXneBVCO+IH4BZj0NtOh1F8RBemZHAJ4Bde7fPgyrBHMEoAy8ZzSbxqCO3IXghMPQTbRlzhJyR7KG3JGsYewdKQJn9ELk3h3PtWWPhAg1IknXmVTWqXxBTBO5I1lDHrX+QR61QumO/RzJHMbekTxqDam/WiSPWp6YjLX7fYot3NFV2UI6ihGZQDe36rjDRRWy+GnN4vKdHdxxr+rL6keYRtS67w8s4g7CO8DL/zlqtYFNaS9rOvwSIVOuIgDaCt2KvHOsGZFLqacTGmZFU6F7IvVjjSOHUi96m+SHnxZdjSM7Ur/2MscfnxW63TxkTUM4jUve35JeLh7gES6XOEj3DW6OfNCSVqXDEe6aRVp4O0A3Hn5faAkL9PKMNWANzxs8RhTo5RvjuvEFcR/jVmsKdwXJutgNs1xg2KLEEQEruEtiVyN0oAm8I5YR/guUqaZe1GPGYQAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="gamehintContainer" style={{ marginRight: "250px" }}>
          <div className="loader"></div>
          <img
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setModalShow(true)}
          />
        </div>
        <h1>BST</h1>
        <div className="interactiveInterface">
          <div className="playercontainer">
            <div className="namegrade">
              <div className="thegrade">{playergrade}</div>
              <h3>player</h3>
            </div>
            <div className="options">
              <Button variant="outline-dark">insert 5</Button>
              <Button variant="outline-dark">remove 2</Button>
              <Button variant="outline-dark">insert 25</Button>
            </div>
          </div>
          <div className="timer">10</div>
          <div className="AIcontainer">
            <div className="namegrade">
              <div className="thegrade">{aigrade}</div>
              <h3>AI</h3>
            </div>
            <div className="options">
              <Button variant="outline-dark">remove 31</Button>
              <Button variant="outline-dark">insert 15</Button>
              <Button variant="outline-dark">remove 12</Button>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant="outline-dark"
            style={{ marginTop: "20px" }}
            onClick={() => {
              start();
            }}
          >
            Start
          </Button>
          <Button variant="outline-dark" style={{ marginTop: "20px" }}>
            Restart
          </Button>
        </div>
        <BinarySearchTree data={arr} ref={ref} />
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <GameMyVerticallyCenteredModal
          show={gamemodalShow}
          onHide={() => setgameModalShow(false)}
        />
      </div>
    </div>
  );
}

export default BSTGame;