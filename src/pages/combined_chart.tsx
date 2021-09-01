//import React, { Component } from 'react';
import { Button, List } from '@material-ui/core';
import React, { Component, useEffect, useState } from 'react';
//import React, { Component,useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import axios from 'axios';


interface Resume{
  doc_name : string,
  performance: number,
  similarity_score_1: number,
  years_of_experience : number
}

const Combined_chart = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [doc_names, setDoc] = useState<string[]>([]);
  const [overall_rank, setRank] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(20);

  const [barheight, setHeight] = useState<number>(size*20);

  useEffect(() => {
    setHeight((barheight) => barheight + size*0.5)
    console.log(barheight)
    axios.get('http://localhost:8000/get-paginated-data',{ 
      params: { 
        page: page,
        size : size 
      }})
      .then(res => {
        const resumeList = res.data;
        setResumes((resumes) => resumes.concat(resumeList));
      });
    console.log(resumes);
    resumes.map(resume => {
      setDoc((doc_names) => doc_names.concat([resume.doc_name]));
      setRank((overall_rank) => overall_rank.concat([resume.performance]));
    });

  },[page]);

  const dataHorBar = {
    labels: doc_names,
    datasets: [
      {
        label: 'Overall Rank',
        backgroundColor: '#EC932F',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        data: overall_rank,
      },
    ],
  };
  return (
    <div
    >
      <HorizontalBar
        data={dataHorBar}
        //width={2}
        height={barheight}
        options={{maintainAspectRatio: false}}
      />
      <Button onClick={(page) => setPage((page) => page + 1)}>Load </Button>
    </div>
  );
};
export default Combined_chart;
