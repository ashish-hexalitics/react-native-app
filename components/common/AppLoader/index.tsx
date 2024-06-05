import React from "react";
import { Stack, ActivityIndicator } from "@react-native-material/core";
import { LoaderSize ,ILoaderProps} from "./enums";

const Index = ({ size = LoaderSize.SMALL }: ILoaderProps) => (
  <Stack fill center spacing={4}>
    <ActivityIndicator size={size} />
  </Stack>
);

export default Index;
