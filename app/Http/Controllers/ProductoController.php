<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductoController extends Controller
{
    // Get all products
    public function getproductoAll()
    {
        return Producto::all();
    }

    // Get a single product by ID
    public function getproducto($id)
    {
        $registro = Producto::find($id);

        if (!$registro) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        return $registro;
    }

    // Delete a product by ID
    public function deleteproducto($id)
    {
        $registro = Producto::find($id);
        if (!$registro) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $registro->delete();

        return response()->json(['message' => 'Producto eliminado correctamente']);
    }

    // Actualizar un producto existente (solo nombre, precio y descripción)
    public function putproducto(Request $request, $id)
    {
        // Buscar el producto por ID
        $registro = Producto::find($id);

        // Verificar si el producto existe
        if (is_null($registro)) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        // Validar los datos antes de actualizar
        $request->validate([
            'nombre' => 'string|max:255',
            'precio' => 'numeric|min:0',
            'descripcion' => 'string|nullable',
        ]);

        // Actualizar solo los campos permitidos
        $registro->nombre = $request->input('nombre', $registro->nombre);
        $registro->precio = $request->input('precio', $registro->precio);
        $registro->descripcion = $request->input('descripcion', $registro->descripcion);

        // Guardar los cambios en la base de datos
        $registro->save();

        return response()->json(['mensaje' => 'Producto actualizado correctamente', 'producto' => $registro]);
    }


    // Create a new product
    public function postproducto(Request $request)
    {
        try {
            // Validate the incoming request
            $request->validate([
                'nombre' => 'required|string|max:255',
                'descripcion' => 'required|string',
                'precio' => 'required|numeric',
            ]);

            // Create the new product
            $registro = Producto::create([
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
                'precio' => $request->precio,
            ]);

            return response()->json(['success' => true, 'data' => $registro], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

}
