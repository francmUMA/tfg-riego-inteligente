import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { getUserActuadores } from '../../lib/actuadorUtils';

const ExampleButton = () => {
    return (
        <button className='w-8 h-8 border bg-red-400'></button>
    );
    
}

function createData(elem) {
    const name = elem.name
    const status = elem.status
    const device = elem.device
    const mode = elem.mode
    const edit = <ExampleButton />

    return { name, status, device, mode, edit  };
}

const columns = [
  {
    width: 10,
    label: 'Nombre',
    dataKey: 'name',
    numeric: false,
  },
  {
    width: 10,
    label: 'Estado',
    dataKey: 'status',
    numeric: true,
  },
  {
    width: 120,
    label: 'Dispositivo',
    dataKey: 'device',
    numeric: false,
  },
  {
    width: 10,
    label: 'Modo',
    dataKey: 'mode',
    numeric: true,
  },
  {
    width: 10,
    label: '',
    dataKey: 'edit',
    numeric: false,
  }
];

const rows = (data) => {
    if (data.length == 0) return [];
    return data.map(createData);
}

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} hover={true} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow> 
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width, backgroundColor: 'black', color: 'white'}}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export const CustomTable = () => {
    const [actuadores, setActuadores] = React.useState([]);

    const fetchActuadores = async () => {
        let res = await getUserActuadores()
        setActuadores(res);
    }

    React.useEffect(() => {
        fetchActuadores()
    }, []);

    return (
    <Paper style={{ height: '100%', width: '100%', border: '0' }}>
        <TableVirtuoso
            data={rows(actuadores)}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
        />
    </Paper>
    );
}