import { Container, Grid, makeStyles, Paper, Typography, List, ListItem, Menu, ListItemText, MenuItem, TextField, Button, Divider } from '@material-ui/core';
import React, { useEffect } from 'react';
import Deposits from '../../Deposits';
import clsx from 'clsx';
import Chart from '../../Chart';
import Table from '../../../../components/Table/Table'
import DatePicker from './DatePicker';
import OptionMenu from './OptionMenu';
import ServerAPI from '../../../../Axios/ServerAPI';
import { getCurrentDateToSQL } from '../../../../Utility';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 340,
  },
}));

const options = [
  'Lifetime',
  'This Month',
  'This Year',
  'Pick Time Span',
];

const StatisticPage = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tableData, setTableData] = React.useState();
  const [tableHeader, setTableHeader] = React.useState();

  //#region Date 
  const find = () => {

  }

  let datePicker = null;
  if (selectedIndex === options.indexOf('Pick Time Span')) {
    datePicker = <DatePicker find={find} />;
  }
  //#endregion

  //#region Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const getLifeTimeAnalyticTableData = () => {
    const data = {
      fromDate: '1000-01-01',
      untilDate: '9999-12-31',
    }
    ServerAPI.getAnalyticTable(data)
      .then(response => { 
        setTableData(response.data);
        setTableHeader(options[selectedIndex])
      })

  }

  const getThisMonthAnalyticData = () => {
    var my_date = new Date();
    var first_date = new Date(my_date.getFullYear(), my_date.getMonth(), 1);
    var last_date = new Date(my_date.getFullYear(), my_date.getMonth() + 1, 0);

    console.log(`${my_date.getFullYear()}-${my_date.getMonth() + 1}-${0}`)
    const data = {
      fromDate: `${my_date.getFullYear()}-${my_date.getMonth()}-${1}`,
      untilDate: `${my_date.getFullYear()}-${my_date.getMonth() + 1}-${0}`,
    }

    ServerAPI.getAnalyticTable(data)
      .then(response => { 
        setTableData(response.data);
        setTableHeader(my_date.getMonth())
      })
  }

  useEffect(() => {
    getLifeTimeAnalyticTableData();
  }, [])

  useEffect(() => {
    switch (selectedIndex) {
      case options.indexOf('Lifetime'):
        getLifeTimeAnalyticTableData();
        break;
      case options.indexOf('This Month'):
        getThisMonthAnalyticData();
        break;
      case options.indexOf('This Year'):
        console.log('This Year')
        break;
      case options.indexOf('Pick Time Span'):
        console.log('Pick Time Span')
        break;
    }
  }, [selectedIndex])

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //#endregion


  return <Container maxWidth="lg" className={classes.container}>
    <div className={classes.appBarSpacer} />

    <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
      Ringkasan Penjualan
    </Typography>

    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Paper>
          <OptionMenu
            options={options}
            selectedIndex={selectedIndex}
            handleClickListItem={handleClickListItem}
            handleClose={handleClose}
            handleMenuItemClick={handleMenuItemClick}
            anchorEl={anchorEl} />
        </Paper>
      </Grid>

      <Grid item xs={9} md={5} lg={6}>
        <Paper >
          {datePicker}
        </Paper>
      </Grid>

      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>


      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Deposits />
        </Paper>
      </Grid>

      {
        tableData ?
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
                Total Penjualan: {tableHeader}
              </Typography>
              <Table
                table={tableData}
              />
            </Paper>
          </Grid> : null
      }

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs>
        <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
          Penjualan 3 bulan pertama
      </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
            Januari
          </Typography>
          <Table
            tableName='view_januari'
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
            Februari
          </Typography>
          <Table
            tableName='view_februari'
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
            Maret
          </Typography>
          <Table
            tableName='view_maret'
          />
        </Paper>
      </Grid>
    </Grid>
  </Container>
}

export default StatisticPage;