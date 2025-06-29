import React, { useEffect, useState } from 'react';
import { Container, Content } from './styles';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useMediaQueries } from '../../styles/mediaQuery';
import Livro from '../Livro';
import Pagination from '@mui/material/Pagination';
import { useSearch } from '../../context/SearchContext';

const livrosPerPage = 5;

const HomePage = () => {
  const { isTablet } = useMediaQueries();
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { search } = useSearch();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/livros/')
      .then(res => res.json())
      .then(data => {
        console.log('Raw API response:', data);
        const livrosData = Array.isArray(data) ? data : (data.data || data.livros || data.results || []);
        setLivros(livrosData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching livros:', err);
        setLoading(false);
      });
  }, []);

  // Filter livros by search
  const filteredLivros = livros.filter(livro => {
    const termo = search.toLowerCase();
    return (
      livro.titulo?.toLowerCase().includes(termo) ||
      livro.autor?.toLowerCase().includes(termo) ||
      livro.descricao?.toLowerCase().includes(termo) ||
      livro.endereco?.toLowerCase().includes(termo)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredLivros.length / livrosPerPage);
  const paginatedLivros = filteredLivros.slice((page - 1) * livrosPerPage, page * livrosPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Navbar />
      <Content isTablet={isTablet}>
        {loading ? (
          <p>Loading books...</p>
        ) : filteredLivros.length > 0 ? (
          <>
            {paginatedLivros.map((livro, index) => (
              <Livro key={index} livro={livro} />
            ))}
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{
                mt: 4,
                display: 'flex',
                justifyContent: 'center',
                '& .MuiPaginationItem-root': {
                  color: (theme) => theme.colors.brown,
                  borderColor: (theme) => theme.colors.brown,
                },
                '& .Mui-selected': {
                  backgroundColor: (theme) => theme.colors.brown + ' !important',
                  color: (theme) => theme.colors.light + ' !important',
                },
              }}
            />
          </>
        ) : (
          <p>Livros não encontrados.</p>
        )}
      </Content>
      <Footer />
    </Container>
  );
};

export default HomePage;