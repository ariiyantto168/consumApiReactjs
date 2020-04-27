import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function App() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650
    },
  })

  const classes = useStyles();

  //rows sebagai mendapatkan variable nya dan setRows untuk mengubah isi variabel yang terdapat di setRows
  const [rows, setRows] = useState([]); // array kosong untuk mendapatkan data, atau debug data

  //callback and promise
  useEffect(() => {
    fetch('https://api.thevirustracker.com/free-api?countryTimeline=ID')
      .then(response => {
        return response.json();
      })
      .then(data => {
        //index array of objects
        setRows(data.timelineitems[0])

        // console.log(data.timelineitems[0])
      })
  }, [])  // ini kode hanya di jalankan 1x setelah di load


  return (
    <TableContainer component = {Paper}>
      <Table className={classes.table} aria-label="Corona Table">
          <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>New Daily Cases</TableCell>
                <TableCell>New Daily deaths</TableCell>
                <TableCell>Total Cases</TableCell>
                <TableCell>Total Recoveries</TableCell>
                <TableCell>Total Deaths</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {/* setiap penggunaan looping di reactjs menggunakan {} */}
            {/* rows.map di dapat daru conts rows */}
              {
                Object.keys(rows).map((key) => (
                  <TableRow key={key}>
                      <TableCell>{key}</TableCell> 
                      <TableCell>{rows[key].new_daily_cases}</TableCell>
                      <TableCell>{rows[key].new_daily_deaths}</TableCell>
                      <TableCell>{rows[key].total_cases}</TableCell>
                      <TableCell>{rows[key].total_recoveries}</TableCell>
                      <TableCell>{rows[key].total_deaths}</TableCell>
                </TableRow>
                ))
              }
          </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
