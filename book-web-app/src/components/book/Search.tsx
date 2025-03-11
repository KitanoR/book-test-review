'use client'
import { Box, Input } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import debounce from "lodash/debounce";
import { LuSearch } from "react-icons/lu";
import { useRef, useState } from "react";

interface SearchProps {
  onChange: (term: string) => void;
}

const Search = ({ onChange }: SearchProps) => {
  const [term, setTerm] = useState("");
  const setQueryDebounce = useRef(debounce(onChange, 300))
  

  const onChangeTerm = (value: string) => {
    setTerm(value);
    setQueryDebounce.current(value);
  }

  return (
    <Box my={3}>
    <InputGroup
      flex="1"
      startElement={<LuSearch />}
      >
      <Input placeholder="Search books by Author" value={term} onChange={({ target }) => onChangeTerm(target.value)}/>
    </InputGroup>
    </Box>
  );
};

export default Search;
