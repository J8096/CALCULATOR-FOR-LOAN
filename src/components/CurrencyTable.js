import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Paper,
} from '@mui/material';
import { useCurrencyContext } from '../context/CurrencyContext';

const CurrencyTable = () => {
  const { baseCurrency, setBaseCurrency } = useCurrencyContext();
  const [rates, setRates] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const currencyOptions = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY'];

  useEffect(() => {
    if (!baseCurrency) return;

    const fetchRates = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const data = await res.json();

        if (!data || !data.rates) throw new Error('Invalid API response');

        setRates(data.rates);
        setError(null);
      } catch (err) {
        setError('Failed to fetch currency data.');
        setRates({});
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rateEntries = Object.entries(rates);
  const paginatedRates = rateEntries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Currency Exchange Rates (Base: {baseCurrency})
        </Typography>

        <FormControl sx={{ minWidth: 200, mb: 2 }}>
          <InputLabel id="currency-select-label">Base Currency</InputLabel>
          <Select
            labelId="currency-select-label"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            label="Base Currency"
          >
            {currencyOptions.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Currency</strong></TableCell>
                    <TableCell><strong>Rate</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRates.map(([currency, rate]) => (
                    <TableRow key={currency}>
                      <TableCell>{currency}</TableCell>
                      <TableCell>{rate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={rateEntries.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrencyTable;
